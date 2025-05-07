document.addEventListener("DOMContentLoaded", function () {
    const teacherFields = document.getElementById("teacherFields");
    const registerBtn = document.getElementById("registerBtn");
    const teacherBtn = document.getElementById("teacherBtn");
    // const studentBtn = document.getElementById("studentBtn");
    
    let userType = "teacher"; // Default selection

    // Toggle user type selection
    teacherBtn.addEventListener("click", function () {
        userType = "teacher";
        teacherFields.style.display = "block";
        teacherBtn.classList.add("active");
        studentBtn.classList.remove("active");
    });

    /*studentBtn.addEventListener("click", function () {
        userType = "student";
        teacherFields.style.display = "none";
        studentBtn.classList.add("active");
        teacherBtn.classList.remove("active");
    });*/

    // Register the user
    registerBtn.addEventListener("click", async function () {
        // teacher fields
        const data = {
            teachUsername: document.getElementById("username").value,
            teachPassword: document.getElementById("password").value
        };
        

        // If user is a teacher add following fields
        if (userType === "teacher") {
            data.teacherFirstName = document.getElementById("teacherFirstName").value;
            data.teacherLastName = document.getElementById("teacherLastName").value;
        }
        else {
            data.teacherFirstName = document.getElementById("teacherFirstName").value;
            data.teacherLastName = document.getElementById("teacherLastName").value;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/${userType}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                document.getElementById("message").innerHTML = `<p class="text-success">Account created successfully!</p>`;
            } else {
                document.getElementById("message").innerHTML = `<p class="text-danger">${result.error}</p>`;
            }
        } catch (error) {
            console.error("Error:", error);
            document.getElementById("message").innerHTML = `<p class="text-danger">Server error. Please try again.</p>`;
        }
    });
});
