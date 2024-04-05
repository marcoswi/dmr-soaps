//To OPEN and CLOSE menu:
const openMenuBtn = document.getElementById("hamburger-icon-menu");
const closeMenuBtn = document.getElementById("close-navbar-menu");
    
const showHideMenu = function showHideMenu (){
    const menu = document.getElementById("navbar-menu");
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
    } else {
        menu.classList.add("active");
    }
};

openMenuBtn.addEventListener("click", showHideMenu);
closeMenuBtn.addEventListener("click", showHideMenu);


//To expand newsletter suscription imputs:
const emailSuscription = document.getElementById("email-for-newsletter");
const otherInputs = document.getElementById("expandable-inputs");

emailSuscription.addEventListener("click", function(){
    otherInputs.classList.add("visible");
});

//To mark the selected option in the menu as active:
document.addEventListener("DOMContentLoaded", function(){
    const currentHref = window.location.href;
    const menuOptions = document.querySelectorAll(".menu-option-a");

    menuOptions.forEach(option =>{
        if (option.href === currentHref ){
            option.classList.add("menu-option-a-active");
        }
    });
});

//Whatsapp icon:
const whatsappIcon = document.getElementById("whatsapp");
whatsappIcon.addEventListener("click", function(){
    window.open("https://wa.me/5491141849597");
})