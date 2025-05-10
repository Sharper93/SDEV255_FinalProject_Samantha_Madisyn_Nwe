// Fetch courses from the server and display them
document.addEventListener("DOMContentLoaded", displayCourses);

async function displayCourses() {
    const courseList = document.getElementById("list-of-courses");

    if (!courseList) {
        console.error("Element with ID 'list-of-courses' not found.");
        return;
    }

    try {
        console.log("Fetching courses from the server...");
        const res = await fetch("http://localhost:3000/api/all_courses");

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const courses = await res.json();
        console.log("Courses fetched successfully:", courses);

        courseList.innerHTML = courses.map(course => `
            <div class="col-md-4 mb-4">
                <div class="card h-100 border border-success">
                    <div class="card-body">
                        <h5 class="card-title text-success">${course.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Major: ${course.focusedMajor}</h6>
                        <p class="card-text">Credits: ${course.credits}</p>
                        <button class="btn btn-outline-success mt-2" onclick="showDescription('${course.name}', \`${course.description}\`)">
                            View Description
                        </button>
                        <button class="btn btn-success mt-2" onclick="addToSchedule('${course._id}', '${course.name}')">
                            Add to Schedule
                        </button>
                    </div>
                </div>
            </div>
        `).join("");

    } catch (err) {
        console.error("Error fetching courses:", err);
        courseList.innerHTML = `<p class="text-danger">Failed to load courses. Please try again later.</p>`;
    }
}

// Show course description in a modal or alert
function showDescription(name, description) {
    alert(`Course: ${name}\nDescription: ${description}`);
}

// Add course to the schedule
async function addToSchedule(courseId, courseName, time) {
    const studentEmail = localStorage.getItem("unameStudent"); // Store this on login

    if (!studentEmail) {
        console.log("LocalStorage unameStudent:", localStorage.getItem("unameStudent"));
        alert("You must be logged in to add courses to your schedule.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/add_to_schedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ studentEmail, courseId, courseName, time })
        });

        if (!response.ok) {
            if (response.status === 409) {
                alert(`You have already added "${courseName}" to your schedule.`);
            } else {
                throw new Error("Failed to add course to schedule.");
            }
        } else {
            alert(`Course "${courseName}" added to your schedule successfully!`);
        }

        
    } catch (err) {
        console.error("Error adding course to schedule:", err);
        alert("Failed to add course to schedule. Please try again.");
    }
}

