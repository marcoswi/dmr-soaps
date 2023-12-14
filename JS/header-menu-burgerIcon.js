const navbarIcon = document.getElementById("navbar-icon");
const navbarUl = document.getElementById("navbar-ul");

navbarIcon.addEventListener("click", () => {
    navbarUl.classList.toggle("active");

    if (navbarUl.classList.contains("active")) {
        navbarIcon.innerText = "\u2715";
    } else {
        navbarIcon.innerText = "\u2630";
    };
});