document.addEventListener("DOMContentLoaded", () => {
    const auth = new TeachAuth();
    
    const logoutButton = document.querySelector("#logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => auth.logOut());
    } else {
        console.error("Logout button not found.");
    }
});
