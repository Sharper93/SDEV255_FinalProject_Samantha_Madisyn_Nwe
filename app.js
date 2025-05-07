//app.js ALL CRUD statements
const express = require("express")
const Course = require("./models/course")
var cors = require('cors')

// for login

const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const teacher = require('./models/teachers')

const app = express()
app.use(cors())

// Middleware that parses HTTP requests with JSON body
app.use(express.json())

// route 
const router = express.Router()

//login authen 
const secret = "supersecret"
app.use("/api", router)

const Teacher = require("./models/teachers");

// creating a teacher user
router.post("/teacher", async (req, res) => {
    if(!req.body.teachUsername || !req.body.teachPassword) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    const newTeacher = await new Teacher({
        teacherFirstName: req.body.teacherFirstName,
        teacherLastName: req.body.teacherLastName,
        teachUsername: req.body.teachUsername,
        teachPassword: req.body.teachPassword,
    })

    try{
        await newTeacher.save()
        res.status(201).json({ message: "Teacher created successfully!", teacher: newTeacher }) // created teacher

    }
    catch (err) {
        console.log(err)
    }
})

//route to authenticate or log in teacher user 
//post request - when you log in you create a new 'session' for teacher
router.post("/teachAuth", async(req,res) => {
    if(!req.body.teachUsername || !req.body.teachPassword){
        res.status(400).json({error: "Missing username or password!"});
        return 
    }
    // try to find username in db, then see if it matches with key:value of username:teachPassword
    // await finding a teacher

    let teacher = await Teacher.findOne({teachUsername : req.body.teachUsername})


    // connection or server error
    if(!teacher){
            res.status(401).json({error : "Bad Username"})
        }
        // check to see if the password matches
        else{
            if(teacher.teachPassword != req.body.teachPassword){
                res.status(401).json({error: "Bad Password"})
            }
            else{
                // successful password
                // create token that is encode with jwt library 
                // send back the username
                // also send back as part of token that you are currently authorized - boolean or num value 
                // i.e. if auth - 0 you are not authorized if auth = 1 you are authorized
                username2 = teacher.teachUsername
                const token = jwt.encode({teachUsername: teacher.teachUsername}, secret)
                // token is username and .secret is encoding the username
                const auth = 1
                // respond with the token

                res.json({
                    username2, 
                    token: token, 
                    auth: auth
                })
            }
        }
    })

// check status of teacher with a valid token, see if it matches the frontend token
router.get("/status", async (req, res) => {
    if(!req.headers["x-auth"]){
        return res.status(401).json({error: "Missing X-Auth"})
    }

    // if x-auth contains the token (it should)
    const token = req.headers("x-auth")
    try {
        const decoded = jwt.decode(token,secret)

        //send back all username and status fields to user/frontend
        let teachers = Teacher.find({}, "username status")
        res.json(teachers)
    }
    catch(ex){
        res.status(401).json({error: "invalid jwt"})
    }
})




//get all courses in db
router.get("/all_courses", async(req, res) => {
    try{
        const courses = await Course.find({})
        res.send(courses)
        console.log(courses)
    }
    catch (err) {
        console.log(err)
    }
})

// grab single course from db
router.get("/all_courses/:id", async (req,res) => {
    try {
        const course = await Course.findById(req.params.id)
        res.json(course)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

// POST REQ for adding course to DB
router.post("/all_courses", async (req, res) => {
    try {
        console.log("Incoming course data:", req.body)  // <== log this

        const course = new Course(req.body)
        await course.save()
        res.status(201).json(course)
        console.log("Saved course:", course)
    } catch (err) {
        console.error("Error saving course:", err)  // <== log the error
        res.status(400).send({ error: err.message })
    }
})


router.put("/all_courses/:id", async (req, res) => {
    // first find the course and update the course the frontend wants us to update
    // need to request the id of the course from request
    // and the find it in the database and update it
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true,
            runValidators: true } // Ensure validation runs
        );

        if (!updatedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }

        console.log("Updated Course:", updatedCourse); // Debugging
        res.status(200).json(updatedCourse);
    } 
    catch (err) {
        console.error("PUT error:", err);
        res.status(400).json({ error: err.message });
    }
});

// delete a course from db
router.delete("/all_courses/:id", async (req, res) => {
    try {
        const result = await Course.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(204);
        }
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Fetch user's schedule
router.get("/user_schedule", async (req, res) => {
    try {
        const userId = "default_user"; // Replace with actual user ID logic
        const schedule = await Schedule.findOne({ userId });

        if (!schedule) {
            return res.status(404).json([]);
        }

        res.json(schedule.courses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch schedule" });
    }
});

// Add a course to the schedule
app.post("/api/add_to_schedule", async (req, res) => {
    try {
        const { courseId, courseName, courseTime } = req.body;

        if (!courseId || !courseName || !courseTime) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const userId = "default_user"; // Replace with actual user ID logic
        let schedule = await Schedule.findOne({ userId });

        if (!schedule) {
            schedule = new Schedule({ userId, courses: [] });
        }

        // Check if the course is already in the schedule
        const courseExists = schedule.courses.some(course => course.courseId === courseId);
        if (courseExists) {
            return res.status(400).json({ error: "Course already in schedule" });
        }

        // Add the course
        schedule.courses.push({ courseId, name: courseName, time: courseTime });
        await schedule.save();

        res.status(200).json({ message: "Course added to schedule" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add course to schedule" });
    }
});


app.use("/api", router)
console.log("Server is running on port 3000")
app.listen(3000)