class StudentAuth{
    constructor(){
        document.querySelector("body").style.display = "none"
        const auth = localStorage.getItem("auth")
        this.validateAuth(auth)
    }

    validateAuth(auth){
        if (auth === "1") {
            document.querySelector("body").style.display = "block";
        }
        else{
            window.location.replace("/login.html"); // Redirect unauthorized users
        }
    }


    logOut(){
        localStorage.removeItem("auth")
        localStorage.removeItem("token")
        localStorage.removeItem("unameStudent")

        window.location.replace("/login.html")
    }

}