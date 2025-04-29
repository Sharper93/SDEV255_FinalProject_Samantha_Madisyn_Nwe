// Import React library to build components
import React from "react";
// Import the Next.js Image component for handling images efficiently
import Image from "next/image";
import Link from "next/link"; // added link import from next.js for navigation between pages
// Import Bootstrap CSS for pre-defined styling
import 'bootstrap/dist/css/bootstrap.min.css';

// Export the page component as the default export of this file
export default function Page() {
    return (
       // main element for page with H1 and styling similiar to M05 tutorial with tailwind
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>
           Login for student and teachers to come soon! 
        </h1>

        <button className="flex items-center">
          {/* TEMPORARY LINK to teacher page */}
          <Link href="./studentDash" className="text-primary font-bold bg-blue-200 p-3 my-2 border-2 border-transparent hover:border-blue-500">Student DashBoard</Link>
        </button>

        <button className="flex items-center">
          {/* TEMPORARY LINK to teacher page */}
          <Link href="./teacherDash" className="text-primary font-bold bg-blue-200 p-3 my-2 border-2 border-transparent hover:border-blue-500">Teacher DashBoard</Link>
        </button>
  
      </main>
    );
  }