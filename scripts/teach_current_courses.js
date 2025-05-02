// event listner to load courses when page is rendered


document.addEventListener("DOMContentLoaded", loadCourses);

async function loadCourses() {
  const courseList = document.getElementById("list-of-courses");

  try {
    const res = await fetch("http://localhost:3000/api/all_courses");
    const courses = await res.json();

    let html = "";
    for (let course of courses) {
        let courseID = course._id;
        html += `
          <div class="col-md-4 mb-4">
            <div class="card h-100 border border-success">
              <div class="card-body">
                <h5 class="card-title text-success">${course.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Major: ${course.focusedMajor}</h6>

                
                <a href="teacherModifyCourses.html?id=${courseID}" class="btn btn-light btn-md my-4 border border-success border-3">Edit Course</a>
                <a href="teacherDeleteCourses.html?id=${courseID}" class="btn btn-light btn-md my-4 border border-success border-3">Delete Course</a>
              </div>
            </div>
          </div>
        `;
    }

    courseList.innerHTML = html;

  } catch (err) {
    console.error("Error fetching courses:", err);
    courseList.innerHTML = `<p class="text-danger">Failed to load courses.</p>`;
  }
}




// commented out the event listner as teacher login is not set up yet

/*document.addEventListener("DOMContentLoaded", loadCourses);

async function loadCourses() {
  const courseList = document.getElementById("list-of-courses");

  try {
    const res = await fetch("http://localhost:3000/api/all_courses");
    const courses = await res.json();

    // Filter courses to only include those created by the logged in teacher
    const teacherCourses = courses.filter(course => course.creatorId === teacherId);

    courseList.innerHTML = teacherCourses.map(course => `

      <div class="col-md-4 mb-4">
        <div class="card h-100 border border-success">
          <div class="card-body">

            <h5 class="card-title text-success">${course.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Major: ${course.focusedMajor}</h6> 
            
          </div>
        </div>
      </div>

    `).join("");

  } catch (err) {
    console.error("Error fetching courses:", err);
    courseList.innerHTML = `<p class="text-danger">Failed to load courses.</p>`;
  }
}
*/
