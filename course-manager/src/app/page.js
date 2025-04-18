// Import React library to build components
import React from "react";
// Import the Next.js Image component for handling images efficiently
import Image from "next/image";
// Import Bootstrap CSS for pre-defined styling
import 'bootstrap/dist/css/bootstrap.min.css';

// Export the Home component as the default export of this file
export default function Home() {
  return (
    // Bootstrap container class for responsive layout; text-center centers the content; mt-5 adds top margin
    <div className="container text-center mt-5 ">
      {/* A heading with padding, text color, 2xl size, and italic font style */}
      <h1 className="p-4 text-gray-700 text-2xl font-italic">Welcome to Course Manager</h1>
      {/* A paragraph describing the application's purpose */}
      <p className="p-3">Effortlessly manage your academic journey with Course Manager. 
        Teachers can log in to update or modify their courses, while students can 
        organize their schedules and explore a comprehensive list of available courses—all 
        in one convenient platform.</p>

      {/* A div containing buttons with top margin */}
      <div className="mt-4"> 
        {/* Button for account creation, styled with white text, blue background, rounded corners, padding, and margin */}
        <button type="createAcc" 
          className="text-primary font-bold bg-blue-200 p-3 my-2 border-2 border-transparent hover:border-blue-500">
          Create an Account
        </button>
      </div>
    </div>
  );
}
