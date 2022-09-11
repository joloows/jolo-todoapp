
function showDropdown(id) {
    closeActiveDropdown();
    document.getElementById("dropdown-" + id).classList.toggle("show");
}

// Close active dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        closeActiveDropdown();
    }
}

// Closes dropdown with "show"
function closeActiveDropdown() {
    var lst = document.getElementsByClassName("dropdown-content");
    for (i = 0; i < lst.length; i++) {
        var activeDropdown = lst[i];
        if (activeDropdown.classList.contains("show")) {
            activeDropdown.classList.remove("show");
        }
    }
}