document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const courseID = urlParams.get('id'); 
    
    if (!courseID) {
        console.error("Error: Course ID is missing in URL");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/all_courses/${courseID}`);

        if (!response.ok) {
            throw new Error("Failed to fetch course data");
        }

        const course = await response.json();

        document.querySelector("#courseID").value = course._id;
        document.querySelector("#name").value = course.name;

    } catch (error) {
        console.error("Error fetching course data:", error);
    }

    const deleteButton = document.querySelector("#deleteBtn");
    if (deleteButton) {
        deleteButton.addEventListener("click", deleteCourse);
    } else {
        console.error("Delete button not found.");
    }
});

async function deleteCourse() {
    const courseID = document.querySelector("#courseID").value;

    if (!courseID) {
        console.error("Error: No course ID found for deletion.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/all_courses/${courseID}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete course");
        }

        alert("Deleted Course");
        window.location.href = "/teacherDashboard.html"; // Redirect after deletion

    } 
    catch (error) {
        console.error("Error deleting course:", error);
        document.querySelector("#error").innerHTML = "Cannot Delete Course";
    }
}
