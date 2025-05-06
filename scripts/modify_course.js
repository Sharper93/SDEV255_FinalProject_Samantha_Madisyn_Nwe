document.addEventListener("DOMContentLoaded", async function () {
    const urlparam = new URLSearchParams(window.location.search)
    const courseID = urlparam.get('id')

    const response = await fetch(`http://localhost:3000/api/all_courses/${courseID}`);

    if (response.ok) {
        const course = await response.json()

        document.querySelector("#courseID").value = course._id;
        document.querySelector("#name").value = course.name;
        document.querySelector("#major").value = course.focusedMajor;
        document.querySelector("#description").value = course.description;
        document.querySelector("#credits").value = course.credits;
    } 
    else {
        console.error("Failed to fetch course data")
    }

    document.querySelector("#updateBtn").addEventListener("click", updateCourse)
})

async function updateCourse() {
    const courseID = document.querySelector("#courseID").value;

    if (!courseID) {
        console.error("Error: No course ID found for update.");
        return;
    }

    const course = {
        name: document.querySelector("#name").value,
        focusedMajor: document.querySelector("#major").value,
        description: document.querySelector("#description").value,
        credits: document.querySelector("#credits").value,
    };

    try {
        const response = await fetch(`http://localhost:3000/api/all_courses/${courseID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(course)
        });

        if (!response.ok) {
            throw new Error(`Failed to update course (Status: ${response.status})`);
        }

        const updatedData = await response.json();
        console.log("Updated Course Data:", updatedData);

        alert("Updated Course!");
        window.location.href = "/teacherDashboard.html"; // Redirect after update

    } catch (error) {
        console.error("Error updating course:", error);
        document.querySelector("#error").innerHTML = "Cannot Update Course";
    }
}
