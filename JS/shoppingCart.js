import productListAndCategories from "./product-list.js";
const productList = productListAndCategories.products;
const productPrices = productListAndCategories.precios;

const mainDisplayContainer = document.getElementById("main-display-container");
const shoppingCartIcon = document.getElementById("shopping-cart-icon-container");
const deleteProduct = document.getElementById("deleteFromCart");


class ShoppingCart {
    constructor() {
        this.productsSavedInCart = JSON.parse(localStorage.getItem('userSelection')) || [];
        this.totalPriceInCart = JSON.parse(localStorage.getItem('totalPriceInCart')) || 0;
        this.totalProductsInCart = JSON.parse(localStorage.getItem('totalProductsInCart')) ||  0;
        this.userSelectionToAddToCart = this.userSelectionToAddToCart.bind(this);
        this.addToLocalStorage = this.addToLocalStorage.bind(this);
        this.userSelection = null;
        this.addToCartConfirmation = null;
        this.isCartShowing = false;
        this.showHideShoppingCart = this.showHideShoppingCart.bind(this);
        this.deleteFromCart = this.deleteFromCart.bind(this);

    };

    shoppingCartIconCount (){
        this.totalProductsInCart = JSON.parse(localStorage.getItem('totalProductsInCart')) || 0;
        const shoppingCartIconCount = document.getElementById("shopping-cart-icon-count");
        shoppingCartIconCount.innerText = this.totalProductsInCart;
    };

    

    userSelectionToAddToCart(event) {
        if (event.target.classList.contains("expandedView-AddToCartBtn")) {
            const quantityInCounter = document.getElementById("counterNumber");
            const quantityValue = parseInt(quantityInCounter.innerText);

            if (!isNaN(quantityValue) && quantityValue > 0) {
                const userSelectedProduct = productList.find(product => product.id == event.target.value);
                const userSelectedFormatOption = document.querySelector('input[name="formatOptions"]:checked');
                
                if (userSelectedProduct && userSelectedFormatOption) {
                    const formatID = userSelectedFormatOption.value;
                    const productType = userSelectedProduct.product_type;
                    const pricesFormatsAvailable = productPrices[productType];
                    const userSelectedFormat = pricesFormatsAvailable.find(format => format.id == formatID);
                    const productImg = userSelectedProduct.img;

                    if (userSelectedFormat) {
                        this.userSelection= {
                            productName: userSelectedProduct.name,
                            productId: userSelectedProduct.id,
                            productImg: productImg,
                            selectedFormatName: userSelectedFormat.formato,
                            selectedFormatPrice: userSelectedFormat.precio,
                            selectedFormatId: userSelectedFormat.id,
                            selectedQuantity: quantityValue
                        };
                    
                        
                        this.totalPriceInCart = (this.userSelection.selectedFormatPrice * this.userSelection.selectedQuantity)+this.totalPriceInCart;
                        this.totalProductsInCart = this.userSelection.selectedQuantity + this.totalProductsInCart;
                        let totalProductPrice = this.userSelection.selectedQuantity * this.userSelection.selectedFormatPrice;

                        this.addToCartConfirmation = document.createElement("div");
                        this.addToCartConfirmation.classList.add("confirmationContainerBackground");
                        this.addToCartConfirmation.id = "confirmationContainer";
                        this.addToCartConfirmation.innerHTML = `
                            <div class="addToCartConfirmationContainer">
                                <div class="addToCartTitle">¿Añadir al carrito?</div>
                                <div class="addToCartProduct">
                                    <div class="addToCartProduct-img-container">
                                        <img class="addToCartProduct-img" src="${productImg}" alt="Product image">
                                    </div>
                                    <div class="addToCartProduct-details">
                                        <div class="addToCartProduct-name">${this.userSelection.productName}</div>
                                        <div class="addToCartProduct-format">*${this.userSelection.selectedFormatName}</div>
                                        <div class="addToCartProduct-quantity">Cantidad: ${this.userSelection.selectedQuantity}</div>
                                        <div class="addToCartProduct-price">Precio unidad:  $${this.userSelection.selectedFormatPrice}</div>
                                        <div class="addToCartProduct-totalPrice">Total:  $${totalProductPrice}</div>
                                    </div>
                                </div>
                                <div class="confirmationButtonsContainer">
                                    <button class="confirmationButton" id="añadirBtn">AÑADIR</button>
                                    <button class="confirmationButton" id="cancelarBtn"">CANCELAR</button>
                                </div>
                            </div>
                        `;
                        mainDisplayContainer.appendChild(this.addToCartConfirmation);
                    }
                }
            }
        }
    };

    calculateTotalPriceInCart(){
        const storedUserSelection = JSON.parse(localStorage.getItem('userSelection')) || [];
        let totalPrice = 0;
        storedUserSelection.forEach(product => {
            let productTotalPrice = product.selectedFormatPrice * product.selectedQuantity;
            totalPrice += productTotalPrice;
        })
        this.totalPriceInCart = totalPrice;
        const shoppingCartTotals = document.getElementById("shoppingCartTotals");
        shoppingCartTotals.innerHTML = `
            <div>TOTAL:</div><div>$${this.totalPriceInCart}</div>
        `;
    };

    addToLocalStorage(event){
        if (event.target.id === "añadirBtn"){
            const storedUserSelection = JSON.parse(localStorage.getItem('userSelection')) || [];

            const productIsAlreadyStored = storedUserSelection.find(product => this.userSelection.productId === product.productId && this.userSelection.selectedFormatId === product.selectedFormatId);
            if(productIsAlreadyStored){
                productIsAlreadyStored.selectedQuantity = productIsAlreadyStored.selectedQuantity + this.userSelection.selectedQuantity;
            } else {
                storedUserSelection.push(this.userSelection);
            }
            
            localStorage.setItem('totalProductsInCart', JSON.stringify(this.totalProductsInCart));
            localStorage.setItem('totalPriceInCart', JSON.stringify(this.totalPriceInCart));
            localStorage.setItem('userSelection', JSON.stringify(storedUserSelection));
            this.addToCartConfirmation.remove();
            this.shoppingCartIconCount();
        } else if (event.target.id === "cancelarBtn") {
            this.addToCartConfirmation.remove();
        }
    };

    showHideShoppingCart(event){
        if (event.target.id === "shopping-cart-icon" || event.target.id === "shopping-cart-icon-count" ){
            const mainElement = document.querySelector('main');
            const productsDisplay = document.getElementById("products-display-container");

            if (!this.isCartShowing){
                const shoppingCartElement = document.createElement("div");
                shoppingCartElement.id = "shoppingCart";
                shoppingCartElement.classList.add("active");
                mainElement.appendChild(shoppingCartElement);
                this.displayShoppingCartData();
                this.isCartShowing = true;
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' 
                });
                productsDisplay.style.display = "none";
            } else {
                const shoppingCartElement = document.getElementById("shoppingCart");
                shoppingCartElement.remove();
                this.isCartShowing = false;
                productsDisplay.style.display = "grid";

            } 
        }; 
    };

    displayShoppingCartData(event){
        const shoppingCartContainer = document.getElementById("shoppingCart");
        shoppingCartContainer.innerHTML = `
                    <div id="shoppingCartTitle">CESTA</div>
                    <div id="productsInShoppingCart"></div>
                    <div id="shoppingCartTotals"></div>
                    <button id="sendConsulta">CONSULTA DISPONIBILIDAD</button>
        `;
        this.calculateTotalPriceInCart();
        this.displayProductsInShoppingCart();
    };


    displayProductsInShoppingCart(){
        //To fill in shopping cart with the products saved in local storage:
        const productsInShoppingCart = document.getElementById("productsInShoppingCart");
        productsInShoppingCart.innerHTML = "";
        const storedUserSelection = JSON.parse(localStorage.getItem('userSelection')) || [];
        if (storedUserSelection.length === 0){
            productsInShoppingCart.innerText = "No hay productos en el carrito";
        } else {
            storedUserSelection.forEach(product => {
                const newProduct = document.createElement("div");
                newProduct.classList.add("product-shoppingCart");
                const totalProductPrice = product.selectedFormatPrice * product.selectedQuantity;
                newProduct.innerHTML = `
                    <div class="productImgContainer-shoppingCart">
                        <img class="productImg-shoppingCart" src="${product.productImg} " alt="${product.productName}">
                    </div>
                    <div class="productInfo-shoppingCart">
                        <div class="productName-shoppingCart" id="${product.productId}"> ${product.productName} </div>
                        <div class="productFormat-shoppigCart">*${product.selectedFormatName}</div>
                        <div class="productPrice-shopingCart" id="${product.selectedFormatId}"> PRECIO UNITARIO: $${product.selectedFormatPrice} </div>
                        <div class="productQuantity-shopingCart"> CANTIDAD: ${product.selectedQuantity} </div>
                        <div id="deleteFromCart" data-product-id="${product.productId}" data-format-id="${product.selectedFormatId}" data-product-quantity="${product.selectedQuantity}">ELIMINAR</div>
                        <div class="productTotalPrice-shoppingcart"><div>PRECIO TOTAL: </div><div>$${totalProductPrice}</div></div>
                    </div>
                `
                productsInShoppingCart.appendChild(newProduct);
            });
        }
    };

    deleteFromCart (event){
        if (event.target.id === "deleteFromCart"){
            //To delete the selected product from the local storage:
            const productId = event.srcElement.dataset.productId; 
            const formatId = event.srcElement.dataset.formatId; 
            const productQuantity = parseInt(event.srcElement.dataset.productQuantity);
            let storedUserSelection = JSON.parse(localStorage.getItem('userSelection'));
            storedUserSelection = storedUserSelection.filter(product => 
                !(product.productId == productId && product.selectedFormatId == formatId)
            );
            localStorage.setItem('userSelection', JSON.stringify(storedUserSelection));
            this.totalProductsInCart = this.totalProductsInCart - productQuantity;
            localStorage.setItem('totalProductsInCart', JSON.stringify(this.totalProductsInCart));

            this.displayProductsInShoppingCart();
            this.calculateTotalPriceInCart();
            this.shoppingCartIconCount();
            window.scrollTo({
                top: 0,
                behavior: 'smooth' 
            });
        };
    };

}

const initShoppingCart = new ShoppingCart();

document.addEventListener("DOMContentLoaded", initShoppingCart.shoppingCartIconCount);
document.body.addEventListener("click", initShoppingCart.userSelectionToAddToCart);
document.body.addEventListener("click", initShoppingCart.addToLocalStorage);
document.body.addEventListener("click", initShoppingCart.showHideShoppingCart);
document.body.addEventListener("click", initShoppingCart.deleteFromCart);


