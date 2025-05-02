// modify or delete the course 
// will have to update to only allow logged in teacher to modify their courses
document.addEventListener("DOMContentLoaded", async function () {
    const urlparam = new URLSearchParams(window.location.search)
    const courseID = urlparam.get('id')

    const response = await fetch("http://localhost:3000/api/all_courses/" + courseID)

    if (response.ok) {
        const song = await response.json()

        document.querySelector("#courseID").value = course._id
        document.querySelector("#name").value = course.name
        document.querySelector("#major").value = course.focusedMajor
        document.querySelector("#description").value = course.description
        document.querySelector("#instructor").value = course.instructor
        document.querySelector("#credits").value = course.credits
        document.querySelector("#date").value = course.releaseDate?.substring(0, 10)
    } else {
        console.error("Failed to fetch course data")
    }

    document.querySelector("#updateBtn").addEventListener("click", updateCourse)
})

async function updateCourse() {
    // create course object from the fields

    const courseID = document.querySelector("#courseID").value

    const course = {

        name: document.querySelector("#name").value,
        focusedMajor: document.querySelector("#major").value,
        description: document.querySelector("#description").value,
        instructor: document.querySelector("#instructor").value,
        credits: document.querySelector("#credits").value,
        releaseDate: document.querySelector("#date").value,

    }

    const response = await fetch("http://localhost:3000/api/all_courses/" + courseID, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json"
        }, 
        body: JSON.stringify(course)
    });

    if (response.ok) {
        alert("Updated course")
    }
    else {
        document.querySelector("#error").innerHTML = "Cannot Update course"
    }


}