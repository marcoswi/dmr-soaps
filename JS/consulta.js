const consultaTextBox = document.getElementById("consultaTextbox");

let userSelection = JSON.parse(localStorage.getItem('userSelection')) || [];
    

if (userSelection.length === 0){
    console.log("no products in cart");
} else {
    const placeholder = "SOMETHING in cart";
    
        console.log(userSelection);
        let productString = "\n\nTe enviaremos la disponibilidad de los productos seleccionados:\n";
        userSelection.forEach(product =>{
            let totalPriceOfProduct = product.selectedQuantity * product.selectedFormatPrice;
            productString += `- ${product.productName} - ${product.selectedFormatName} - Cantidad: ${product.selectedQuantity} - Precio Unit(id:${product.selectedFormatId}): $${product.selectedFormatPrice}\n`;
        });

        consultaTextBox.value = productString;

    };


window.onload = function() { 
    var el = document.getElementById('g-recaptcha-response'); 
    if (el) { 
            el.setAttribute('required', 'required'); 
        } 
};
