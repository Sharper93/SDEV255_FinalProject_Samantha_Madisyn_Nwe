// Fetch and display the user's schedule
document.addEventListener("DOMContentLoaded", fetchSchedule);

async function fetchSchedule() {
    const scheduleList = document.getElementById("schedule-list");

    if (!scheduleList) {
        console.error("Element with ID 'schedule-list' not found.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/user_schedule");

        if (!response.ok) {
            throw new Error("Failed to fetch schedule.");
        }

        const schedule = await response.json();
        scheduleList.innerHTML = schedule.map(course => `
            <div class="col-md-4 mb-4">
                <div class="card h-100 border border-success">
                    <div class="card-body">
                        <h5 class="card-title text-success">${course.name}</h5>
                    </div>
                </div>
            </div>
        `).join("");
        
    } catch (err) {
        console.error("Error fetching schedule:", err);
        scheduleList.innerHTML = `<p class="text-danger">Failed to load schedule. Please try again later.</p>`;
    }
}