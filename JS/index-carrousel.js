import productos from "../products.js";

let productNumber = 0;
let length = productos.length;
let clickedButton = "";

document.addEventListener('DOMContentLoaded', function() {
    carrousel(productNumber);
});

/* CARROUSEL FUNCTION */
function carrousel (productNumber, clickedButton) {

    const carrouselProduct = document.getElementById("carrousel-product");

    if (clickedButton == "previous-button") {
        carrouselProduct.classList.add("hide-previous");
        setTimeout(() => {
            carrouselProduct.classList.remove("hide-previous");
        }, 50);
    } else {
        carrouselProduct.classList.add("hide-next");
        setTimeout(() => {
            carrouselProduct.classList.remove("hide-next");
        }, 50);
    }
    

    const productImg = document.getElementById("product-img");
    productImg.innerHTML = `<img src="${productos[productNumber].img}" alt="${productos[productNumber].name}">`;

    const productName = document.getElementById("product-name");
    productName.innerText = productos[productNumber].name;

    const productDescription = document.getElementById("product-description");
    productDescription.innerText = productos[productNumber].description;
};


/* CARROUSEL NEXT BUTTON */
const nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", function (event){
    clickedButton = event.target.name;
    if (productNumber >= (length-1)) {
        productNumber = length-1;
        carrousel(productNumber,clickedButton);
        return(productNumber);
    } else {
        productNumber++;
        carrousel(productNumber, clickedButton);
        return productNumber;
    }
})

/* CARROUSEL PREVIOUS BUTTON */
const previousButton = document.getElementById("previous-button");
previousButton.addEventListener("click", function (event){
    clickedButton = event.target.name;
    if (productNumber <= 0) {
        productNumber = 0;        
        carrousel(productNumber, clickedButton);
    } else {
        productNumber = productNumber - 1;
        carrousel(productNumber, clickedButton);
        return productNumber;
    }
})






