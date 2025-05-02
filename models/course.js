// models/course.js
const mongoose = require("../db") // `db` is your mongoose connection

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  focusedMajor: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  credits: { type: Number, min: 1, max: 4 },
  addedDate: { type: Date, default: Date.now }
})

const Course = mongoose.model("Course", courseSchema)

module.exports = Course