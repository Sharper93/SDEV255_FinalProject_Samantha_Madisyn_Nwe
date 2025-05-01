// Import NextResponse to send structured responses 
import { NextResponse } from 'next/server';
// Import MongoDB connection 
import { dbConnect } from '../../../../lib/db'; // Adjusted relative path to your db connection helper
// Import the Course model 
import Course from '@/models/Course'; 

// POST: Create a new course
export async function POST(request) {
  // Ensure connection to DB is established before performing any operations
  await dbConnect();

  // Parse incoming JSON body from the POST request
  const body = await request.json();

  try {
    // Create a new course document using the request body
    const newCourse = await Course.create(body);

    // Return the newly created course with 201 Created ok status
    return NextResponse.json(newCourse, { status: 201 });
  } 
  catch (error) {
    // If validation fails or DB error occurs, return a 400 Bad Request with the error message
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}


// GET: Fetch courses for a specific teacher
// this will be modified at a later date when login and authenticatin for teachers are created
export async function GET(req) {
  // Ensure DB connection is active
  await dbConnect();

  // Extract search parameters from the request URL
  const { searchParams } = new URL(req.url)
  // Extract the `teacherId` query parameter from the request URL
  const teacherId = searchParams.get('teacherId');

  // Check if `teacherId` was provided
  if (!teacherId) {
    // If not provided, return a 400 with an error message
    return NextResponse.json({ error: 'Missing teacherId' }, { status: 400 });
  }

  try {
    // Query the Course collection to find all courses created by this teacher
    // The 'createdBy' field in the Course model is matched against the teacherId
    const courses = await Course.find({ createdBy: teacherId });

    // If successful, return the list of courses as a JSON response
    return NextResponse.json(courses);
  } 
  catch (error) {
    // If any error occurs during the database query, return a 500 Internal Server Error
    return NextResponse.json(
      { error: 'Failed to fetch courses', details: error.message },
      { status: 500 }
    );
  }
  }
