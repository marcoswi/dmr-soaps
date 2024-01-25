//Fade in Encuentra el Tuyo Button:
const encuentraElTuyoBtn = document.getElementById("main-section-btn");
const giftSectionText = document.getElementById("gift-section-text");

window.addEventListener("scroll", function () {
    // Get the position of the element relative to the viewport
    const btnPosition = encuentraElTuyoBtn.getBoundingClientRect().top;
    const textPosition = giftSectionText.getBoundingClientRect().top;
    // Check if the element is in the viewport
    if (btnPosition < window.innerHeight -100) {
        encuentraElTuyoBtn.classList.add("appear");
    }
    if (textPosition < this.window.innerHeight) {
        giftSectionText.classList.add("appear");
    }
});