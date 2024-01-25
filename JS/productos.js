import productListAndCategories from "./product-list.js";
const productList = productListAndCategories.products;
const productPrices = productListAndCategories.precios;
const productCategories = productListAndCategories.productCategoriesArray;
productCategories.push("todos");
const filtersContainer = document.getElementById("filters-container")
const productDisplay = document.getElementById("products-display-container");
const mainDisplayContainer = document.getElementById("main-display-container");
let selectedProductCategories = [];
const categoryButtons = document.getElementsByClassName("category-filter");

let count = 0;

//Class to display products:
class DisplayProducts {

    constructor() {
        this.generateExpandedProductCard = this.generateExpandedProductCard.bind(this);
    }

    //To show the product category filter container:
    filterContainer(){
        productCategories.reverse().forEach(category => {
            const upperCaseCategory = category.charAt(0).toUpperCase() + category.slice(1);
            filtersContainer.innerHTML += `
                <div class="category-filter" id="${category}">${upperCaseCategory}</div>
            `;
        });
        const todosCategory = document.getElementById("todos");
        todosCategory.classList.add("active");
    };

    //To display the products in the productDisplay container:
    displayProducts(products){
        productDisplay.innerHTML = "";
        products.forEach(product =>{
            productDisplay.innerHTML += `
            <div class="productCard" id="${product.id}">
                    <div class="productImgContainer">
                        <img class="productImg" src="${product.img} " alt="Imagen ${product.name} ">
                    </div>
                    <div class="productTitle">${product.name} </div>
                    <div class="product-benefits">${product.product_benefits[0]} · ${product.product_benefits[1]} · ${product.product_benefits[2]}</div>
                    <button class="addToCartBtn">AGREGAR AL CARRITO</button>
            </div>
            `;
        });
    };

    //To filter products according to the selected category and display only the ones that apply:
    filterProducts(selectedProductCategories, productList){
        if (selectedProductCategories == "todos"){
            this.displayProducts(productList)
        } else {
            const filteredSelectedProducts = productList.filter(products => selectedProductCategories.includes(products.product_type));
            this.displayProducts(filteredSelectedProducts);
        }
    };

    //To assign the active class to the selected category:
    assignActiveStatusToFilterOptions (categoryButtons){
        const categoryButtonsArray = [...categoryButtons];
        categoryButtonsArray.forEach(btn => {
            btn.addEventListener("click", function (){
                selectedProductCategories = [];
                for(let i = 0; i < categoryButtonsArray.length; i++){
                    categoryButtonsArray[i].classList.remove("active");
                }
                if (!btn.classList.contains("active")){
                    btn.classList.add("active")
                    selectedProductCategories.push(btn.id);
                    displayProductsClass.filterProducts(selectedProductCategories, productList);
                }
            })
        });
    };

    //Methods related to the EXPANDED PRODUCT VIEW:

    productFormatsAndPrices (product) {
        const productCategory = product.product_type;
        const pricesArray = productPrices[productCategory];
        const selectedProductPrices = product.price;

        const pricesDiv = document.createElement("div");
        pricesDiv.classList.add("addToCartcontainer");

        const pricesFormatsTitle = document.createElement("div");
        pricesFormatsTitle.classList.add("priceFormatTitle");
        pricesFormatsTitle.innerText = "Formatos y precios:";

        pricesDiv.appendChild(pricesFormatsTitle);

        selectedProductPrices.forEach((id)=>{
            const formatAndPrice = pricesArray.find(price => price.id == id)
            const formatAndPriceDiv = document.createElement("div");
            formatAndPriceDiv.classList.add("formatPriceOption");
            if (selectedProductPrices.length > 1){
                formatAndPriceDiv.innerHTML = `
                <input type="radio" id="format${id}" name="formatOptions" value="${formatAndPrice.precio}">
                <label for="format${id}">${formatAndPrice.formato} - AR$${formatAndPrice.precio}</label>
                `;
            } else {
                formatAndPriceDiv.innerHTML = `
                <input type="radio" id="format${id}" name="formatOptions" value="${formatAndPrice.precio}" checked>
                <label for="format${id}">${formatAndPrice.formato} - AR$${formatAndPrice.precio}</label>
                `;
            };
            
            pricesDiv.appendChild(formatAndPriceDiv);
        })

        const addToCart = document.createElement("div");
        addToCart.innerHTML = `
                    <div class="expandedView-addToCartContainer">
                        <div class="expandedView-CounterContainer">
                            <button class="counterAddSubstractBtn" id="substract">-</button>
                            <div class="counter">${count} </div>
                            <button class="counterAddSubstractBtn" id="add">+</button>
                        </div>
                        <button class="expandedView-AddToCartBtn">AGREGAR AL CARRITO</button>
                    </div>
        `;
        pricesDiv.appendChild(addToCart);
        return pricesDiv;
    };

    generateExpandedProductCard (event){

        const productCard = event.target.closest('.productCard');
        if(productCard){
    
            filtersContainer.style.display = "none";
            productDisplay.style.display = "none";
    
            const product = productList.find(product => product.id == productCard.id);
            const pricesDiv = this.productFormatsAndPrices(product);
            
            const expandedProductView = document.createElement("div");
            expandedProductView.classList.add("expandedView-ProductCard");
            expandedProductView.id = `expandedCard${product.id}`;

            const closeBtn = document.createElement("div");
            closeBtn.innerHTML = `
                <button id="expandedView-CloseBtn" class="closeExpandedViewBtn">&times;</button>
            `;
            
            const productImg = document.createElement("div");
            productImg.innerHTML = `
                    <div class="expandedView-ProductImgContainer">
                        <img class="expandedView-ProductImg" src="${product.img} " alt="">
                    </div>
            `;
    
            const productDetails = document.createElement("div");
            productDetails.innerHTML = `
                    <div class="expandedView-productName">${product.name} </div>
                    <div class="expandedView-productBenefits"></div>
                    <div class="expandedView-productDescription">${product.description}</div>
            `;
    
            expandedProductView.appendChild(closeBtn);
            closeBtn.addEventListener("click", () => this.closeExpandedView(product.id));
            expandedProductView.appendChild(productImg);
            expandedProductView.appendChild(pricesDiv);
            expandedProductView.appendChild(productDetails);
            
            mainDisplayContainer.appendChild(expandedProductView);

        }
    };

    closeExpandedView(id){
        const expandedCard = document.getElementById(`expandedCard${id}`)
        if(expandedCard){
            expandedCard.remove();
        };
        filtersContainer.style.display = "flex";
        productDisplay.style.display = "grid";
    }
};

const displayProductsClass = new DisplayProducts();
displayProductsClass.filterContainer();
displayProductsClass.displayProducts(productList);
displayProductsClass.assignActiveStatusToFilterOptions(categoryButtons);

// To display expanded product view:
productDisplay.addEventListener("click", displayProductsClass.generateExpandedProductCard);










