// event listener to add songs when DOM is triggered
// triggered when page is loaded

document.addEventListener("DOMContentLoaded", async function() {
    const response = await fetch("http://localhost:3000/api/all_courses");
    const courses = await response.json();

    let html = "";
    for (let course of courses) {
        let courseID = course._id
        html += `<li>Course: ${course.name}  - Major: ${course.focuedMajor} - 
        <a href="details.html?id=${courseID}">Course Details</a> - 
        <a href="edit.html?id=${courseID}">Edit Course</a> - 
        <a href="delete.html?id=${courseID}">Delete Course</a></li>`;
    }

    document.querySelector("#list-of-courses").innerHTML = html;
});
