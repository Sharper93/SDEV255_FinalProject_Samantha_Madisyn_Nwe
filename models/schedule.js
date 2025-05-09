const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    studentEmail: { type: String, required: true }, // from auth
    courseId: { type: String, required: true },     // Store as String instead of ObjectId
    courseName: { type: String, required: true },
});

module.exports = mongoose.model("Schedule", scheduleSchema);