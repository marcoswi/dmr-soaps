import productos from "../products.js";

/* To change the quantity in the shopping cart icon */
window.addEventListener(('storage'), ()=>{
    console.log("storage changed");
    updateShoppingCartIconQuantity();
    
    const shoppingCartContainer = document.getElementById("shoppingCartContainer");
    if(shoppingCartContainer){
        shoppingCartContainer.remove();
        populateShoppingCart();
        deletebuttons ();
    }
    
});

document.addEventListener("DOMContentLoaded", function (){
    updateShoppingCartIconQuantity();
})

function updateShoppingCartIconQuantity (){
    const shoppingCartButtonQuantity = document.getElementById("shopping-cart-button-quantity");
    const localStorageInfo = JSON.parse(localStorage.getItem("cart"))|| [];
    shoppingCartButtonQuantity.innerText = localStorageInfo.length;
}

/* To show Shopping Cart */

const shoppingCartButton = document.getElementById("shopping-cart-button");

shoppingCartButton.addEventListener("click", function (){
    const shoppingCart = document.getElementById("shoppingCartContainer");
    if (shoppingCart) {
        if (shoppingCart.classList.contains("active")){
            shoppingCart.classList.remove("active");
        } else {
            const shoppingCartContainer = document.getElementById("shoppingCartContainer");
            shoppingCartContainer.remove();
            populateShoppingCart();
            shoppingCart.classList.add("active");
        }
    } else {
        populateShoppingCart();
    }
})


function populateShoppingCart (){

    const savedProducts = JSON.parse(localStorage.getItem("cart"));
    if (savedProducts){
        const totalPrices = [];

    //Create Shopping Cart Container:
    const border = document.getElementById("border");
    const newShoppingCart = document.createElement("div");
    newShoppingCart.id = "shoppingCartContainer";
    newShoppingCart.classList.add("shoppingCartContainer");
    
    const shoppingCartTitle = document.createElement("div");
    shoppingCartTitle.innerText = "Your shopping cart: ";
    shoppingCartTitle.classList.add("shoppingCartTitle");
    newShoppingCart.appendChild(shoppingCartTitle);

    savedProducts.forEach(product => {
        //Create Product Card for Shopping Cart:
        const productCard = document.createElement("div");
        productCard.classList.add("productCardShoppingCart");
        const foundProduct = productos.find(producto => product.productId === producto.id );
        
        //Create product IMG
        const productImg = document.createElement("img");
        productImg.src = foundProduct.img;
        productImg.classList.add("productImgShoppingCart");

        //Create product Info div:
        const productInfoDiv = document.createElement("div");
        productInfoDiv.classList.add("productInfoDivShoppingCart");

        //Create product name:
        const productName = document.createElement("div");
        productName.innerText = foundProduct.name;
        productName.classList.add("productNameShoppingCart");

        //Product unit Price
        const productPrice = document.createElement("div");
        productPrice.innerText = "Unit price: "+foundProduct.price + "$";
        productPrice.classList.add("productPriceShoppingCart");

        //Product Quantity:
        const productQuantity = document.createElement("div");
        productQuantity.innerText = "Quantity: "+product.productQuantity;
        productQuantity.classList.add("productQuantityShoppingCart");

        // Delete Product Button:
        const deleteProduct = document.createElement("button");
        deleteProduct.innerText = "Delete";
        deleteProduct.id = "deleteProduct"+product.productId;
        deleteProduct.name = product.productId;
        deleteProduct.classList.add("deleteProductShoppingCart");

        //Total Price:
        const totalPrice = document.createElement("div");
        const productTotalPrice = foundProduct.price * product.productQuantity;
        totalPrices.push(productTotalPrice);
        totalPrice.innerText = productTotalPrice +"$";
        totalPrice.classList.add("productTotalPriceShoppingCart");

        productCard.appendChild(productImg);

        productInfoDiv.appendChild(productName);
        productInfoDiv.appendChild(productPrice);
        productInfoDiv.appendChild(productQuantity);
        productInfoDiv.appendChild(deleteProduct);

        productCard.appendChild(productInfoDiv);
        productCard.appendChild(totalPrice);
        newShoppingCart.appendChild(productCard);
    })

    const totalPricesSum = totalPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    /* Sub Total div shopping cart */
    const totalsDivShoppingCart = document.createElement("div");
    totalsDivShoppingCart.classList.add("totalsDivShoppingCart");
    const subTotalPriceTitle = document.createElement("div");
    subTotalPriceTitle.classList.add("subTotalPriceTitle");
    subTotalPriceTitle.innerText = "Subtotal: ";
    const subTotalPrice = document.createElement("div");
    subTotalPrice.innerText = totalPricesSum + "$";
    subTotalPrice.classList.add("subTotalprice");

    totalsDivShoppingCart.appendChild(subTotalPriceTitle);
    totalsDivShoppingCart.appendChild(subTotalPrice);
    newShoppingCart.appendChild(totalsDivShoppingCart);

    border.appendChild(newShoppingCart);
    deletebuttons ();

    //This line makes the element transition from right to left correctly the first time its created, because the transition works fine after the element is created:
    void newShoppingCart.offsetWidth;
    newShoppingCart.classList.add("active");

    } else {
        console.log("nothing");
    }
    
};

function deletebuttons (){
    const deleteButtons = Array.from(document.getElementsByClassName("deleteProductShoppingCart"));
    deleteButtons.forEach(button => {
        button.addEventListener("click", (event)=>{
            const localStorageInfo = JSON.parse(localStorage.getItem("cart"));
            let productToRemove = localStorageInfo.findIndex(obj => obj.productId == event.target.name);
            // Check if the object with the matching id was found
            if (productToRemove !== -1) {
                // Use splice to remove the object at the found index
                localStorageInfo.splice(productToRemove, 1);
                localStorage.setItem("cart", JSON.stringify(localStorageInfo));
                window.dispatchEvent(new Event('storage'));   
            } else {
                console.log('Object not found with id:', event.target.name);
            }
        });
    });
};

