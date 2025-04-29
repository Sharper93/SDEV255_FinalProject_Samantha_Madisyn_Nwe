"use client";
import React, { useState } from "react";
import Link from "next/link";

// attempting to push and pull branch to main

export default function ViewCourses() {
    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/courses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: courseName, code: courseCode }),
        });

        const data = await res.json();
        if (res.ok) {
            setMessage("Course added successfully!");
            setCourseName("");
            setCourseCode("");
        } else {
            setMessage(data.error || "Something went wrong.");
        }
    };

    return (
        <div className="container text-center mt-5">
            <h1 className="text-gray-700 text-2xl font-bold mb-4">Add Course</h1>

            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Course Name"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    required
                    className="p-2 border border-gray-300 rounded w-80"
                />
                <input
                    type="text"
                    placeholder="Course Code"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    required
                    className="p-2 border border-gray-300 rounded w-80"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Course
                </button>
            </form>

            {message && <p className="text-green-600">{message}</p>}

            <Link href="/teacherDash">
                <button className="text-primary font-bold bg-blue-200 p-3 my-2 border-2 border-transparent hover:border-blue-500">
                    Return to Dashboard
                </button>
            </Link>

            <Link href="/teacherViewCourses">
                <button className="text-primary font-bold bg-blue-200 p-3 my-2 mx-2 border-2 border-transparent hover:border-blue-500">
                    View Current Courses
                </button>
            </Link>
        </div>
    );
}
