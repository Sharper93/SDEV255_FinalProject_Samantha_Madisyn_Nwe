"use client"; // client component for use
import Link from "next/link"; // added link import from next.js for navigation between pages

export default function Page() {
    return (
        // design for page
        <div className="container text-center mt-5">
            <h1 className="text-gray-700 text-2xl font-bold py-4">Active Courses</h1>
            <p>
                Course will display in separate containers with Name, CourseID/Code, and Major Reference. <br></br>
                They will then have buttons to display description, modify, and delete. <br></br>
                COMING SOON!
            </p>

            <Link href="/studentDash">
                <button type="button" 
                className="text-primary font-bold bg-blue-200 p-3 my-2 border-2 border-transparent hover:border-blue-500">
                    Return to Dashboard
                </button>
            </Link>

            <Link href="./studentAddCourse">
                <button type="button" 
                className="text-primary font-bold bg-blue-200 p-3 my-2 mx-5 border-2 border-transparent hover:border-blue-500">
                    Add New Course
                </button>
            </Link>
            
        </div>
    );
}