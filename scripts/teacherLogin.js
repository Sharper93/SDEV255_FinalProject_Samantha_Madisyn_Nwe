let token;

window.onload=function(){
document.querySelector("#teachLoginBtn").addEventListener("click", function() {
    const teachUsername = document.querySelector("#teachUsername").value
    const teachPassword = document.querySelector("#teachPassword").value
    login(teachUsername, teachPassword)

})}

async function login(teachUsername, teachPassword) {
    const teach_login_cred = {
        teachUsername,
        teachPassword
    }

    // send login post request o backend

    const response = await fetch("http://localhost:3000/api/teachAuth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(teach_login_cred)
    })

    if(response.ok){
        //take the token and save to storage
        const tokenResponse = await response.json()
        token = tokenResponse.token
        unameTeach = tokenResponse.username2
        auth = tokenResponse.auth
        console.log(token)

        //saveit
        localStorage.setItem("token", token)
        localStorage.setItem("unameTeach", teachUsername)
        localStorage.setItem("auth", auth)

        // redirect user 
        window.location.replace("/teacherDashboard.html")

    }
    else{
        document.querySelector("#errorMsg").innerHTML = "Bad username and password"
    }
}