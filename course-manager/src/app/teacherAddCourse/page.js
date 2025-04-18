import React from "react";
import Link from "next/link"; // added link import from next.js for navigation between pages

export default function ViewCourses() {
    return (
        <div className="container text-center mt-5">

            <h1 className="text-gray-700 text-2xl font-bold">Add Course</h1>
            <p>Form to add course coming soon! </p>

            <Link href="/teacherDash">
                <button type="button" 
                className="text-primary font-bold bg-blue-200 p-3 my-2 border-2 border-transparent hover:border-blue-500">
                    Return to Dashboard
                </button>
            </Link>

            <Link href="./teacherViewCourses">
                <button type="button" 
                className="text-primary font-bold bg-blue-200 p-3 my-2 mx-2 border-2 border-transparent hover:border-blue-500">
                    View Current Courses
                </button>
            </Link>
        </div>
    )
}