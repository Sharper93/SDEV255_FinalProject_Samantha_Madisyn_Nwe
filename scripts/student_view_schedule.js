document.addEventListener("DOMContentLoaded", loadSchedule);

async function loadSchedule() {
    const studentEmail = localStorage.getItem("unameStudent");
    const scheduleContainer = document.getElementById("list-of-courses");

    console.log("Loaded studentEmail from localStorage:", studentEmail);

    if (!studentEmail || !scheduleContainer) return;

    try {
        console.log("Fetching schedule for:", studentEmail);
        const res = await fetch(`http://localhost:3000/api/student_schedule?email=${studentEmail}`);
        console.log("API Response Status:", res.status);

        const schedule = await res.json();
        console.log("Schedule data:", schedule);

        if (!Array.isArray(schedule)) throw new Error("Invalid data");

        scheduleContainer.innerHTML = schedule.map(course => `
            <div class="card my-3" id="course-${course._id}">
                <div class="card-body">
                    <h5 class="card-title">${course.courseName}</h5>
                    <button class="btn btn-danger" onclick="removeCourse('${course._id}', '${course.courseName}')">
                        Remove from Schedule
                    </button>
                </div>
            </div>
        `).join("");

    } catch (err) {
        scheduleContainer.innerHTML = `<p class="text-danger">Failed to load schedule.</p>`;
        console.error("Schedule load error:", err);
    }
}

async function removeCourse(scheduleID, courseName) {
    console.log("Schedule ID to remove:", scheduleID);

    try {
        const response = await fetch(`http://localhost:3000/api/student_schedule/${scheduleID}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            let errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        alert(`Removed Course: ${courseName}`);
        const courseElement = document.getElementById(`course-${scheduleID}`);
        if (courseElement) {
            courseElement.remove();
        }

    } catch (error) {
        console.error("Error deleting course:", error.message);
        alert(`Cannot remove course: ${error.message}`);
    }
}
