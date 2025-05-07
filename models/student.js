// models/student.js
const mongoose = require("../db") // `db` is your mongoose connection

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    password: { type: String, required: true },
    schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Array of course IDs
})

const Student = mongoose.model("Student", studentSchema)

module.exports = Student