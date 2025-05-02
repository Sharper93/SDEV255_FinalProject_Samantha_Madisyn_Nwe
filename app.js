//app.js ALL CRUD statements

const express = require("express")
const Course = require("./models/course")
var cors = require('cors')

const app = express()
app.use(cors())

// Middleware that parses HTTP requests with JSON body
app.use(express.json())

// route 
const router = express.Router()

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
        res.json(courses)
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
        const course = req.body
        await Course.updateOne({ _id: req.params.id }, course)
        console.log(course)
        res.sendStatus(204)
    } catch (err) {
        console.error("PUT error:", err)
        res.status(400).send({ error: err.message })
    }
})

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