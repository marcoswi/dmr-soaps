import productos from "../products.js";
import {addEventListenersToProductCards, closeExpandedView, addToCart } from "./expanded-Product-Card.js";



const productGallery = document.getElementById("product-gallery");

document.addEventListener("DOMContentLoaded", function (){
    showProducts(productos);
})

/* To show all products when product gallery is accessed: */
function showProducts (productos) {
    if (productos.length > 0) {
        productGallery.style.opacity = 3;
        productos.forEach( product => {
            /* Create product card */
            const productCard = document.createElement('div');
            productCard.classList.add('product-card'); 
            productCard.id = product.id;
            /* Create img in product card */
            const productImage = document.createElement('img');
            productImage.src = "."+product.img;
            productImage.alt = product.name;
            productImage.id = product.id;
            /* Create name in product card */
            const productName = document.createElement ('div');
            productName.classList.add('product-name');
            productName.innerText = product.name;
            productName.id = product.id;

            /* Append product card to product gallery */
            productCard.appendChild(productImage);
            productCard.appendChild(productName);
            productGallery.appendChild(productCard);  

            /* EXPANDED view background */
            const expandedViewBackground = document.createElement("div");
            expandedViewBackground.classList.add("expandedViewBackground");
            const expandedCardId = "expandedCardId"+product.id;
            expandedViewBackground.id = expandedCardId;
            /* Create Expanded view for when card is clicked */
            const expandedProductCard = document.createElement("div");
            expandedProductCard.classList.add("expanded-product-card");
            /* Create expanded view IMG */
            const expandedProductImg = document.createElement("img");
            expandedProductImg.src = "."+product.img;
            expandedProductImg.alt = product.name;
            /* Create expanded view Product Info */
            const expandedProductInfo = document.createElement("div");
            expandedProductInfo.classList.add("expanded-product-info");
            /* Create Close Expanded View button */
            const closeExpandedViewButton = document.createElement("button");
            closeExpandedViewButton.classList.add("closeExpandedViewButton");
            closeExpandedViewButton.onclick = closeExpandedView;
            closeExpandedViewButton.id = product.id;
            closeExpandedViewButton.innerText = "X";
            /* Create expanded view Product Name and Description */
            const expandedProductName = document.createElement("div");
            expandedProductName.innerText = product.name;
            expandedProductName.classList.add("expandedProductName");
            const expandedProductDescription = document.createElement("div");
            expandedProductDescription.classList.add("expandedProductDescription");
            expandedProductDescription.innerText = product.description;
            /* Create expanded view Product PRICE */
            const productPrice = document.createElement("div");
            productPrice.classList.add("expanded-product-price")
            productPrice.innerText = "Price: €" + product.price;

            /* CART CONTAINER */
            const addToCartContainer = document.createElement("div");
            addToCartContainer.classList.add("addToCartContainer");
            /* Cart Title */
            const addToCartTitle = document.createElement("div");
            addToCartTitle.innerText = "Add to cart:";
            addToCartTitle.classList.add("addToCartTitle");
            /* Cart Minus Button */
            const minusButton = document.createElement("button");
            minusButton.id = "minusButton"+product.id;
            minusButton.classList.add("minusButton");
            minusButton.innerText = "-";
            /* Cart Quantity Counter */
            const quantityCounter = document.createElement("div");
            quantityCounter.classList.add("quantityCounter");
            quantityCounter.id = "quantityCounter"+product.id;
            quantityCounter.innerText = 1;
            /* Cart Plus Button */
            const plusButton = document.createElement("button");
            plusButton.classList.add("plusButton");
            plusButton.id = "plusButton"+product.id;
            plusButton.innerText = "+";
            /* Add to cart Button */
            const addToCartButton = document.createElement("button");
            addToCartButton.classList.add("addToCartButton");
            addToCartButton.id = "addToCartButton"+product.id;
            addToCartButton.innerText = "Add";
            addToCartButton.name = product.id;
            addToCartButton.addEventListener("click", function(event){
                addToCart (event);
            })
            /* APPEND all to Add To Cart Container */
            addToCartContainer.appendChild(minusButton);
            addToCartContainer.appendChild(quantityCounter);
            addToCartContainer.appendChild(plusButton);

            /* Append Product Name, Description & Close button to Product Info */
            expandedProductInfo.appendChild(closeExpandedViewButton);
            expandedProductInfo.appendChild(expandedProductName);
            expandedProductInfo.appendChild(expandedProductDescription);
            expandedProductInfo.appendChild(productPrice);
            expandedProductInfo.appendChild(addToCartTitle);
            expandedProductInfo.appendChild(addToCartContainer);
            expandedProductInfo.appendChild(addToCartButton);
            /* Append Product Img and Info to ExpandedProductCard */
            expandedProductCard.appendChild(expandedProductImg);
            expandedProductCard.appendChild(expandedProductInfo);
            /* Append ExpandedProductCard to expandedViewBackground */
            expandedViewBackground.appendChild(expandedProductCard);
            /* Append ExpandedProductCard to Product Gallery*/
            productGallery.appendChild(expandedViewBackground);
        });
        addEventListenersToProductCards()
    } else {
        const noProducts = document.createElement("p");
        noProducts.innerText = "No products to display";
        productGallery.appendChild(noProducts);
    }
    };


/* To show product according to the user selection of product type checkboxes: */
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", handleCheckboxChange);
});

function handleCheckboxChange() {
    const checkboxStatus = Array.from(checkboxes)
    .map(checkbox => ({
        name: checkbox.id,
        checked: checkbox.checked,
    }))
    .filter(checkbox => checkbox.checked );
    filterProductos(checkboxStatus);
    }

function filterProductos (checkboxStatus) {
    const filteredProducts = productos.filter(product => {
        return checkboxStatus.some(checkedItem => checkedItem.name === product.product_type);
        });
        productGallery.innerHTML = "";
        showProducts(filteredProducts);
    }





    