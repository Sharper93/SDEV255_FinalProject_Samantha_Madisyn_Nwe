let token;

window.onload=function(){
document.querySelector("#studentLoginBtn").addEventListener("click", function() {
    const studentEmail = document.querySelector("#studentEmail").value // changed to studentEmail as student login doesnt have username variable sh
    const password = document.querySelector("#password").value
    login(studentEmail, password)  // changed to studentEmail as student login doesnt have username variable sh

})}

async function login(studentEmail, password) {  // changed to studentEmail as student login doesnt have username variable sh
    const student_login_cred = {
        studentEmail,  // changed to studentEmail as student login doesnt have username variable sh
        password
    }

    // send login post request o backend

    const response = await fetch(`http://localhost:3000/api/studentAuth`, {
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
        unameStudent = tokenResponse.studentEmail
        auth = tokenResponse.auth
        console.log(token)

        //saveit
        localStorage.setItem("token", token)
        localStorage.setItem("unameStudent", unameStudent) 
        localStorage.setItem("auth", auth)

        // redirect user 
        window.location.replace("/studentDashboard.html")

    }
    else{
        document.querySelector("#errorMsg").innerHTML = "Bad username and password"
    }
}