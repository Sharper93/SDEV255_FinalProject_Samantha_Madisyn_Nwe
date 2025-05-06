const mongoose = require("../db") // `db` is your mongoose connection

const teacherSchema = new mongoose.Schema({
  teacherFirstName: { type: String, required: true },
  teacherLastName: { type: String, required: true },
  teachUsername: { type: String, required: true },
  teachPassword: { type: String, required: true },
  teachStatus: String,
})

const Teacher = mongoose.model("Teacher", teacherSchema)

module.exports = Teacher;