import { getWhatsappUrl } from "./cartUtils.js";

const menu = document.getElementById("navbar-menu");
const openMenuBtn = document.getElementById("hamburger-icon-menu");
const closeMenuBtn = document.getElementById("close-navbar-menu");
const whatsappButtons = document.querySelectorAll("[data-whatsapp-link]");

function toggleMenu() {
    const isOpen = menu.classList.toggle("active");
    openMenuBtn.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
}

function closeMenu() {
    menu.classList.remove("active");
    openMenuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
}

function markActiveNavigation() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".menu-option-a").forEach(option => {
        const optionPage = option.getAttribute("href") || "index.html";
        const isActive = optionPage === currentPage || (currentPage === "" && optionPage === "index.html");

        option.classList.toggle("menu-option-a-active", isActive);
        if (isActive) {
            option.setAttribute("aria-current", "page");
        }
    });
}

function refreshWhatsappLinks() {
    whatsappButtons.forEach(link => {
        link.setAttribute("href", getWhatsappUrl());
    });
}

if (openMenuBtn && closeMenuBtn && menu) {
    openMenuBtn.addEventListener("click", toggleMenu);
    closeMenuBtn.addEventListener("click", closeMenu);
    menu.addEventListener("click", event => {
        if (event.target.matches("a")) {
            closeMenu();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    markActiveNavigation();
    refreshWhatsappLinks();
});

window.addEventListener("cart:updated", refreshWhatsappLinks);
