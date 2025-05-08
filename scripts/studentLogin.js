let token;

window.onload=function(){
document.querySelector("#studentLoginBtn").addEventListener("click", function() {
    const studentUsername = document.querySelector("#studentUsername").value
    const studentPassword = document.querySelector("#studentPassword").value
    login(studentUsername, studentPassword)

})}

async function login(studentUsername, studentPassword) {
    const student_login_cred = {
        studentUsername,
        studentPassword
    }

    // send login post request o backend

    const response = await fetch("http://localhost:3000/api/studentAuth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student_login_cred)
    })

    if(response.ok){
        //take the token and save to storage
        const tokenResponse = await response.json()
        token = tokenResponse.token
        unameStudent = tokenResponse.username2
        auth = tokenResponse.auth
        console.log(token)

        //saveit
        localStorage.setItem("token", token)
        localStorage.setItem("unameStudent", studentUsername)
        localStorage.setItem("auth", auth)

        // redirect user 
        window.location.replace("/studentDashboard.html")

    }
    else{
        document.querySelector("#errorMsg").innerHTML = "Bad username and password"
    }
}