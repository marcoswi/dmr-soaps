
/* To show EXPANDED PRODUCT CARDS when a product is clicked */
export function addEventListenersToProductCards () {
    const HTMLproductCards = document.getElementsByClassName("product-card");
    
    const productCardsArray = Array.from(HTMLproductCards);
        
    productCardsArray.forEach(card => {
        card.addEventListener("click", (event) => {
            const cardID = "expandedCardId"+event.target.id;
            const productExpandedCard = document.getElementById(cardID)
            productExpandedCard.style.display = "flex";
            quantityCounter(event);
        })
    })
};

/* To close EXPANDED PRODUCT CARDS with X*/
export function closeExpandedView(event) {
    const expandedCardId = ("expandedCardId"+event.target.id);
    const expandedCard = document.getElementById(expandedCardId);
    expandedCard.style.display = "none";
};


/* Product Quantity Counter in Expanded View */
function quantityCounter (event) {
    const productId = event.target.id;

    const quantityCounter = document.getElementById("quantityCounter"+productId);
    var quantityCounterInnerText = quantityCounter.innerText;
    var quantityInNumber = parseInt(quantityCounterInnerText, 10);

    /* Minus button */
    const minusButton = document.getElementById("minusButton"+productId);
    minusButton.addEventListener("click", function(){
        if (quantityInNumber > 0) {
            quantityInNumber = quantityInNumber - 1;
            quantityCounter.innerText = quantityInNumber;
        }
    })
    /* Plus button */
    const plusButton = document.getElementById("plusButton"+productId);
    plusButton.addEventListener("click", function(){
        quantityInNumber = quantityInNumber + 1;
        quantityCounter.innerText = quantityInNumber;
    });
};

/* To add Products to the shopping cartx */  

export function addToCart (event){
    const productId = parseInt(event.target.name, 10);
    const productQuantityCounter = document.getElementById("quantityCounter"+productId)
    const productQuantity = parseInt(productQuantityCounter.innerText, 10);

    const productToAddToCart = {
        productId: productId,
        productQuantity: productQuantity
    }
    const existingDataInLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = existingDataInLocalStorage.find(obj => obj.productId === productToAddToCart.productId)
    
    if (existingProduct) {
        var newQuantity = existingProduct.productQuantity + productToAddToCart.productQuantity;
        existingProduct.productQuantity = newQuantity;
    } else {
        existingDataInLocalStorage.push(productToAddToCart);
    };

    localStorage.setItem("cart", JSON.stringify(existingDataInLocalStorage));
    window.dispatchEvent(new Event('storage'));
};