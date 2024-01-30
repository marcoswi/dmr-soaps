import productListAndCategories from "./product-list.js";
const productList = productListAndCategories.products;
const productPrices = productListAndCategories.precios;

const mainDisplayContainer = document.getElementById("main-display-container");



class ShoppingCart {

    constructor() {
        this.productsInCart = [];
        this.totalAmount = 0;
        this.totalQuantity = 0;

        this.userSelectionToAddToCart = this.userSelectionToAddToCart.bind(this);

    };

    userSelectionToAddToCart (event){
        if (event.target.classList.contains("expandedView-AddToCartBtn")){

            const quantityInCounter = document.getElementById("counterNumber");
            const quantityValue = parseInt(quantityInCounter.innerText);
            
            if (quantityValue > 0){
                //To find the product that the user selected:
                const userSelectedProduct = productList.find(product => product.id == event.target.value)
                
                //To get the id of the format selected by the user:
                const userSelectedFormatOption = document.querySelector('input[name="formatOptions"]:checked');
                const formatID = userSelectedFormatOption.value;
    
                //To get the product_type of the product and get the available formats and prices:
                const productType = userSelectedProduct.product_type;
                const pricesFormatsAvailable = productPrices[productType];
                
                //To find the format and price that the user selected:
                const userSelectedFormat = pricesFormatsAvailable.find(format => format.id == formatID);
    
                const userSelectionAddToCart = {
                    productName: userSelectedProduct.name,
                    productId: userSelectedProduct.id,
                    selectedFormatName: userSelectedFormat.formato,
                    selectedFormatPrice: userSelectedFormat.precio,
                    selectedFormatId: userSelectedFormat.id,
                };
                this.productsInCart.push(userSelectionAddToCart);
                return userSelectionAddToCart;
            };
        };
    };


}

const initShoppingCart = new ShoppingCart();

mainDisplayContainer.addEventListener("click", initShoppingCart.userSelectionToAddToCart);



