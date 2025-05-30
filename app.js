//app.js ALL CRUD statements
const express = require("express")
// for login
const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const app = express()
const mongoose = require("mongoose");

var cors = require('cors')
app.use(cors())
// Middleware that parses HTTP requests with JSON body
app.use(express.json())

// route 
const router = express.Router()

//login authen 
const secret = "supersecret"
app.use("/api", router)
const Course = require("./models/course")
const Schedule = require("./models/schedule");
const Teacher = require("./models/teachers");

// creating a teacher user
router.post("/teacher", async (req, res) => {
    const { teacherFirstName, teacherLastName, teachUsername, teachPassword } = req.body;

    if (!teacherFirstName || !teacherLastName || !teachUsername || !teachPassword) {
        return res.status(400).json({ error: "All fields are required for teacher." });
    }

    const teacher = new Teacher({ teacherFirstName, teacherLastName, teachUsername, teachPassword });

    try {
        await teacher.save();
        res.status(201).json({ message: "Teacher registered successfully!", teacher });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to register teacher." });
    }
});


const Student = require("./models/student");

router.post("/student", async (req, res) => {
    const { firstName, lastName, studentEmail, password } = req.body;

    if (!firstName || !lastName || !studentEmail || !password) {
        return res.status(400).json({ error: "All fields are required for student." });
    }

    const student = new Student({ firstName, lastName, studentEmail, password });

    try {
        await student.save();
        res.status(201).json({ message: "Student registered successfully!", student });
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to register student." });
    }
});


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

    router.post("/studentAuth", async (req, res) => {
        const { studentEmail, password } = req.body;
    
        if (!studentEmail || !password) {
            return res.status(400).json({ error: "Missing email or password." });
        }
    
        const student = await Student.findOne({ studentEmail });
    
        if (!student) {
            return res.status(401).json({ error: "Invalid email." });
        }
    
        if (student.password !== password) {
            return res.status(401).json({ error: "Invalid password." });
        }
    
        const token = jwt.encode({ studentEmail }, secret);
        res.json({
            studentEmail,
            token,
            auth: 1
        });
    });


// add courses to schedule
router.post("/add_to_schedule", async (req, res) => {
    const { studentEmail, courseId, courseName } = req.body;

    if (!studentEmail || !courseId || !courseName) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    try {
        // Prevent duplicates (same student, same course)
        const existing = await Schedule.findOne({ studentEmail, courseId });
        if (existing) {
            return res.status(409).json({ error: "Course already added to schedule." });
        }

        const scheduleItem = new Schedule({
            studentEmail,
            courseId,
            courseName,
        });

        await scheduleItem.save();
        res.status(201).json({ message: "Course added to schedule!", scheduleItem });
    } catch (err) {
        console.error("Failed to add to schedule:", err);
        res.status(500).json({ error: "Internal server error." });
    }
});

// display schedule saved on db for student by their email
app.get("/api/student_schedule", async (req, res) => {
    const studentEmail = req.query.email;
    if (!studentEmail) return res.status(400).json({ error: "Missing student email" });

    try {
        const schedule = await Schedule.find({ studentEmail }); 
        res.json(schedule);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve schedule" });
    }
});


// DELETE route to remove a course from schedule
router.delete("/student_schedule/:id", async (req, res) => {
    console.log("Received DELETE request for schedule ID:", req.params.id);
    try {
        // Find by _id instead of courseId
        const result = await Schedule.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 0) {
            console.log("Schedule item not found during deletion.");
            return res.status(404).json({ error: "Schedule item not found" });
        }

        console.log("Successfully deleted schedule item.");
        res.sendStatus(204);  // Successfully deleted
    } catch (err) {
        console.error("Error during deletion:", err);
        res.status(500).json({ error: "Failed to delete schedule item" });
    }
});


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

app.use("/api", router)
console.log("Server is running on port 3000")
app.listen(3000)