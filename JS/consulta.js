import { buildEnquiryMessage, getCartItems } from "./cartUtils.js";

const consultaTextBox = document.getElementById("consultaTextbox");

if (consultaTextBox && getCartItems().length) {
    consultaTextBox.value = buildEnquiryMessage();
}

window.addEventListener("load", () => {
    const recaptchaResponse = document.getElementById("g-recaptcha-response");

    if (recaptchaResponse) {
        recaptchaResponse.setAttribute("required", "required");
    }
});
