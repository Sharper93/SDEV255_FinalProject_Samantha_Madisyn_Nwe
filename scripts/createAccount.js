document.addEventListener("DOMContentLoaded", function () {
    const teacherFields = document.getElementById("teacherFields");
    const studentFields = document.getElementById("studentFields"); // added student fields
    const registerBtn = document.getElementById("registerBtn");
    const teacherBtn = document.getElementById("teacherBtn");
    const studentBtn = document.getElementById("studentBtn"); // added student button
    
    let userType = "teacher"; // Default selection

    // Toggle user type selection
    teacherBtn.addEventListener("click", function () {
        userType = "teacher";
        teacherFields.style.display = "block";
        studentFields.style.display = "none"; // do not show student when selection is teacher
        teacherBtn.classList.add("active");
        studentBtn.classList.remove("active");
    });

    studentBtn.addEventListener("click", function () {
        userType = "student";
        teacherFields.style.display = "none";
        studentFields.style.display = "block";
        studentBtn.classList.add("active");
        teacherBtn.classList.remove("active");
    });

    // Register the user
    registerBtn.addEventListener("click", async function () {

        let data = {}; // empty until determined if it is a student or teacher 
    
        // teacher fields
        // If user is a teacher add following fields
        if (userType === "teacher") {
            data = {
                teacherFirstName: document.getElementById("teacherFirstName").value,
                teacherLastName: document.getElementById("teacherLastName").value,
                teachUsername: document.getElementById("username").value,
                teachPassword: document.getElementById("password").value
            };
            endpoint = "/api/teacher";
            // if user is a teacher the following fields
        } else if (userType === "student") {
            data = {
                firstName: document.getElementById("studentFirstName").value,
                lastName: document.getElementById("studentLastName").value,
                studentEmail: document.getElementById("studentEmail").value, //email id
                password: document.getElementById("studentPassword").value //student
            };
            endpoint = "/api/student";
        }

        try {
            const response = await fetch(`http://localhost:3000/api/${userType}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (!response.ok) {
                document.getElementById("message").textContent = result.error || "Registration failed.";
            } 
            else {
                alert(result.message);
                window.location.href = "/login.html";
            }
        } 
        catch (err) {
            console.error("Registration error:", err);
            document.getElementById("message").textContent = "Server error during registration.";
        }
    });
});
