"use client"; // client component for use
import Link from "next/link"; // added link import from next.js for navigation between pages

export default function Page() {
        // const [courses, setCourses] = useState([]);

    // Fetch courses from the database when the component mounts
    /*useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch(); // TODO: Adjust the API endpoint once created
            const data = await response.json();
            setCourses(data);
        };
        
        fetchCourses();
    }, []);*/

    // Function to handle course deletion
    /* const handleDelete = async (courseId) => {
        await fetch(``, { // TODO: Adjust the API endpoint once created
            method: 'DELETE',
        });
        // Refresh the courses list after deletion
        setCourses(courses.filter(course => course.id !== courseId));
    };*/
    return (
        // design for page
        <div className="container text-center mt-5">
            <h1 className="text-gray-700 text-2xl font-bold py-4">Active Courses</h1>
            <p>
                Course will display in separate containers with Name, CourseID/Code, and Major Reference. <br></br>
                They will then have buttons to display description, modify, and delete. <br></br>
                COMING SOON!
            </p>

            <Link href="/teacherDash">
                <button type="button" 
                className="text-primary font-bold bg-blue-200 p-3 my-2 border-2 border-transparent hover:border-blue-500">
                    Return to Dashboard
                </button>
            </Link>

            <Link href="./teacherAddCourse">
                <button type="button" 
                className="text-primary font-bold bg-blue-200 p-3 my-2 mx-5 border-2 border-transparent hover:border-blue-500">
                    Add New Course
                </button>
            </Link>
            
        </div>
    );
}


