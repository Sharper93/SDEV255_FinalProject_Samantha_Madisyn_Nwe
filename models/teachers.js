// models/course.js
const mongoose = require("../db") // `db` is your mongoose connection

const teacherSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    teachEmail: { type: String, required: true },
    password: { type: String, required: true },
})

const Teacher = mongoose.model("Teacher", teacherSchema)

module.exports = Teacher