const mongoose = require("mongoose");

// Define the Course Schema (embedded in Schedule)
const courseSchema = new mongoose.Schema({
    courseId: { type: String, required: true },
    name: { type: String, required: true },
    time: { type: String, required: true },
});

// Define the Schedule Schema
const scheduleSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Unique identifier for the user
    courses: [courseSchema], // Array of courses
});

// Create and export the Schedule model
const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;