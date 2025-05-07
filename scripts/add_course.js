//scripts/add_course.js
addEventListener("DOMContentLoaded", function() {
  document.querySelector("#addBtn").addEventListener("click", addCourse)
})

// add the course to db... must be async func because we are calling data outside of our server
async function addCourse() {
  console.log("Add Course clicked")
  //create course obj based on the form that the user fills out
 //makes it easier when we send the data to the backend
 try {
   const course = {
      name: document.querySelector("#name").value,
      focusedMajor: document.querySelector("#major").value,
      description: document.querySelector("#description").value,
      credits: document.querySelector("#credits").value,
      addedDate: document.querySelector("#date").value, 
      // add username to show who created the course
      teachUsername: localStorage.getItem("unameTeach")
     
   };

   // fetch is GET but we can change to method to change type -- POST 
  const response = await fetch("http://localhost:3000/api/all_courses/", {
      method: "POST",
      //type of data using
      headers: {
          "Content-Type" : "application/json"
      },
      // translate song data to json so backend can see it
      body: JSON.stringify(course)
  });

   if (response.ok) {
     const results = await response.json();
     alert("Added course with ID of " + results._id);
     // reset form after course is successfully added
     window.location.href = "/teacherDashboard.html"; 
     document.querySelector("form").reset();
   }
   else {
     const error = await response.json();
     document.querySelector("#error").innerHTML = "Cannot Add course: " + error.error;
   }
 } 
 catch (err) {
   console.error("Fetch error:", err);
   document.querySelector("#error").innerHTML = "Server error: Could not reach API.";
 }
}
