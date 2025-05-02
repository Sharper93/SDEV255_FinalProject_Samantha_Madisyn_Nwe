// event listener to add songs when DOM is triggered
// triggered when page is loaded

document.addEventListener("DOMContentLoaded", async function() {
    const response = await fetch("http://localhost:3000/api/songs");
    const songs = await response.json();

    let html = "";
    for (let song of songs) {
        let songID = song._id
        html += `<li>${song.title} - ${song.artist} - 
        <a href="details.html?id=${songID}">Details</a> - 
        <a href="edit.html?id=${songID}">Edit Song</a> - 
        <a href="delete.html?id=${songID}">Delete Song</a></li>`;
    }

    document.querySelector("#list-of-songs").innerHTML = html;
});
