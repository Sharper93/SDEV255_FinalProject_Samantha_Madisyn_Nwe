"use client"; // Required in Next.js app router to enable client-side interactivity
// client interaction page 
// app/teacherAddCourse/page.js
// ONLY UI for Adding a course

// Import React's useState hook for managing component state
import { useState } from "react";

// Component for the "Add Course" UI page
export default function AddCourse() {

    // Local state to hold form input values
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    focusedMajor: "",
    credits: "",
    createdBy: "661ff50c1234567890abcdef", // Temporary teacher ID, will be dynamic later
  });

  // State to display any error messages to the user
  const [error, setError] = useState("");

  // Called when any input field changes — updates formData state
  const handleChange = (e) => {
    // e.target.id is the input's ID, e.target.value is its value
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Called when "Add Course" button is clicked
  const handleSubmit = async () => {
    try {
      // Make POST request to /api/courses with the form data
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Convert form data to JSON; ensure credits is a Number
        body: JSON.stringify({ ...formData, credits: Number(formData.credits) }),
      });

      // If the API responded with 201 success
      if (response.ok) {
        const result = await response.json();
        alert("Added course with ID of " + result._id);

        // Reset form to blank values
        setFormData({
          name: "",
          description: "",
          focusedMajor: "",
          credits: "",
          createdBy: "replaceWithTeacherId", // Placeholder remains
        });
        setError("");
      } else {
        // Handle 400 error (e.g., validation failure)
        const errData = await response.json();
        setError("Cannot Add Course: " + errData.error);
      }
    } catch (err) {
      // Network or server error
      console.error(err);
      setError("Server error: Could not reach API.");
    }
  };

  // Render the form UI
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add a Course</h1>

      {/* Prevent default form submission behavior (page reload) */}
      <form onSubmit={(e) => e.preventDefault()}>
        
        {/* Course Name */}
        <div className="mb-4">
          <label htmlFor="name">Course Name:</label>
          <input
            type="text"
            id="name"
            className="border w-full p-2"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Course Description */}
        <div className="mb-4">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            className="border w-full p-2"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Focused Major */}
        <div className="mb-4">
          <label htmlFor="focusedMajor">Major:</label>
          <input
            type="text"
            id="focusedMajor"
            className="border w-full p-2"
            value={formData.focusedMajor}
            onChange={handleChange}
          />
        </div>

        {/* Credits */}
        <div className="mb-4">
          <label htmlFor="credits">Credits:</label>
          <input
            type="number"
            id="credits"
            className="border w-full p-2"
            min="1"
            value={formData.credits}
            onChange={handleChange}
          />
        </div>

        {/* Submit button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Course
        </button>

        {/* Display error message if any */}
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
    </div>
  );
}
