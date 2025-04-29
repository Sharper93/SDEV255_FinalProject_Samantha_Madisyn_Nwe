import React from "react";
import Link from "next/link"; // added link import from next.js for navigation between pages

// Export the page component as the default export of this file
export default function Page() {
    return (
        <div className="container text-center mt-5">
        <h1 className="text-gray-700 text-2xl font-bold">Welcome to Student Dashboard</h1>
        <p>Here you can modify and manage your courses.</p>

        <Link href="./studentViewCourses">
            <button type="viewYourCourses" 
            className="text-primary font-bold bg-blue-200 p-3 my-2 mx-4 border-2 border-transparent hover:border-blue-500">
            View Courses
            </button> 
        </Link>

        <Link href="./studentAddCourse">
            <button type="addCourse" 
            className="text-primary font-bold bg-blue-200 p-3 my-2 mx-4 border-2 border-transparent hover:border-blue-500">
            Add Course
            </button>
        </Link>

      </div>
    );
  }