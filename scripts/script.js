// event listner to load courses when page is rendered
document.addEventListener("DOMContentLoaded", loadCourses);

async function loadCourses() {
  const courseList = document.getElementById("list-of-courses");

  try {
    const res = await fetch("http://localhost:3000/api/all_courses");
    const courses = await res.json();

    courseList.innerHTML = courses.map(course => `
      <div class="col-md-4 mb-4">
        <div class="card h-100 border border-success">

          <div class="card-body">
            <h5 class="card-title text-success">${course.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Major: ${course.focusedMajor}</h6>
            <p class="card-text">Credits: ${course.credits}</p>

            <button class="btn btn-outline-success mt-2" data-bs-toggle="modal" data-bs-target="#descModal"
              onclick="showDescription('${course.name}', \`${course.description}\`)">
              View Description
            </button>     
          </div>

        </div>
      </div>
    `).join("");

  } catch (err) {
    console.error("Error fetching courses:", err);
    courseList.innerHTML = `<p class="text-danger">Failed to load courses.</p>`;
  }
}

function showDescription(name, description) {
  document.getElementById("descModalLabel").textContent = name;
  document.getElementById("descContent").textContent = description;
}
