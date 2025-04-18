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
      <p>Effortlessly manage college courses upon login</p>

      {/* A div containing buttons with top margin */}
      <div className="mt-4"> 
        {/* Button for student login, styled with white text, blue background, rounded corners, padding, and margin */}
        <button type="studentLogin" className="text-white bg-blue-600 rounded-md p-3 mx-2">Student Login</button>
        {/* Button for professor login, styled similarly to the student login button */}
        <button type="teacherLogin" className="text-white bg-blue-600 rounded-md p-3 mx-2">Professor Login</button>
      </div>
    </div>
  );
}
