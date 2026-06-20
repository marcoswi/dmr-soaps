import productListAndCategories from "./product-list.js";
import { addCartItem, formatCurrency } from "./cartUtils.js";

const productList = productListAndCategories.products;
const productPrices = productListAndCategories.precios;
const productCategories = ["todos", ...productListAndCategories.productCategoriesArray];
const filtersContainer = document.getElementById("filters-container");
const productDisplay = document.getElementById("products-display-container");
const productDetail = document.getElementById("product-detail-container");
const productStatus = document.getElementById("products-status");

let activeCategory = "todos";

function getProductUrl(product) {
    const url = new URL(window.location.href);
    url.searchParams.set("producto", String(product.id));
    return `${url.pathname}${url.search}`;
}

function getCatalogUrl() {
    const url = new URL(window.location.href);
    url.searchParams.delete("producto");
    return `${url.pathname}${url.search}`;
}

function getFormatsForProduct(product) {
    const categoryPrices = productPrices[product.product_type] || [];

    return product.price
        .map(formatId => categoryPrices.find(format => format.id === formatId))
        .filter(Boolean);
}

function sortProductsByAvailability(products) {
    return [...products].sort((firstProduct, secondProduct) =>
        Number(secondProduct.availability) - Number(firstProduct.availability)
    );
}

function renderFilters() {
    if (!filtersContainer) {
        return;
    }

    filtersContainer.innerHTML = productCategories.map(category => `
        <button class="category-filter ${category === activeCategory ? "active" : ""}" type="button" data-category="${category}">
            ${category === "todos" ? "Todos" : category}
        </button>
    `).join("");
}

function renderProducts() {
    if (!productDisplay) {
        return;
    }

    const filteredProducts = activeCategory === "todos"
        ? productList
        : productList.filter(product => product.product_type === activeCategory);
    const productsToShow = sortProductsByAvailability(filteredProducts);

    productStatus.textContent = `${productsToShow.length} productos disponibles para consultar`;

    if (!productsToShow.length) {
        productDisplay.innerHTML = `<p class="empty-state">No encontramos productos en esta categoría.</p>`;
        return;
    }

    productDisplay.innerHTML = productsToShow.map(product => {
        const formats = getFormatsForProduct(product);
        const startingPrice = formats.length ? Math.min(...formats.map(format => format.precio)) : 0;

        return `
            <article class="productCard ${product.availability ? "" : "unavailable"}" data-product-id="${product.id}">
                <button class="productCard-button" type="button" aria-label="Ver detalles de ${product.name}">
                    <span class="productImgContainer">
                        <img class="productImg" src="${product.img}" alt="${product.name}" loading="lazy">
                        <span class="availability-badge">${product.availability ? "Disponible" : "Agotado"}</span>
                    </span>
                    <span class="productInfo">
                        <span class="productCategory">${product.product_type}</span>
                        <span class="productTitle">${product.name}</span>
                        <span class="product-benefits">${product.product_benefits.join(" · ")}</span>
                        <span class="productPriceFrom">Desde ${formatCurrency(startingPrice)}</span>
                    </span>
                </button>
            </article>
        `;
    }).join("");
}

function closeProductDetail({ updateHistory = true } = {}) {
    productDetail.innerHTML = "";
    productDetail.hidden = true;
    productDisplay.hidden = false;
    filtersContainer.hidden = false;
    productStatus.hidden = false;

    if (updateHistory) {
        history.pushState({}, "", getCatalogUrl());
    }
}

function renderProductDetail(product, { updateHistory = true } = {}) {
    const formats = getFormatsForProduct(product);

    productDisplay.hidden = true;
    filtersContainer.hidden = true;
    productStatus.hidden = true;
    productDetail.hidden = false;
    productDetail.innerHTML = `
        <article class="expandedView-ProductCard">
            <button class="backToCatalogBtn" type="button" aria-label="Volver al catálogo">
                <span aria-hidden="true">←</span>
                Volver al catálogo
            </button>
            <div class="expandedView-ProductImgContainer">
                <img class="expandedView-ProductImg" src="${product.img}" alt="${product.name}">
            </div>
            <div class="expandedView-productDetails">
                <p class="productCategory">${product.product_type}</p>
                <h2 class="expandedView-productName">${product.name}</h2>
                <p class="expandedView-productBenefits">${product.product_benefits.join(" · ")}</p>
                <p class="expandedView-productDescription">${product.description}</p>
                <form class="enquiry-form" data-product-id="${product.id}">
                    <fieldset class="formatOptions" ${product.availability ? "" : "disabled"}>
                        <legend>Formatos y precios</legend>
                        ${formats.map((format, index) => `
                            <label class="formatPriceOption">
                                <input type="radio" name="formatOptions" value="${format.id}" ${index === 0 ? "checked" : ""}>
                                <span>${format.formato}</span>
                                <strong>${formatCurrency(format.precio)}</strong>
                            </label>
                        `).join("")}
                    </fieldset>
                    <label class="quantity-label" for="quantity-${product.id}">Cantidad</label>
                    <div class="quantity-control">
                        <button class="counterAddSubstractBtn" type="button" data-action="decrease">-</button>
                        <input id="quantity-${product.id}" class="quantity-input" type="number" min="1" max="20" value="1">
                        <button class="counterAddSubstractBtn" type="button" data-action="increase">+</button>
                    </div>
                    <button class="expandedView-AddToCartBtn" type="submit" ${product.availability ? "" : "disabled"}>
                        ${product.availability ? "Agregar a consulta" : "Producto agotado"}
                    </button>
                </form>
            </div>
        </article>
    `;

    if (updateHistory) {
        history.pushState({ productId: product.id }, "", getProductUrl(product));
    }

    requestAnimationFrame(() => {
        productDetail.scrollIntoView({ behavior: "smooth", block: "start" });
    });
}

function showProductAddedNotice(productName) {
    const notice = document.createElement("div");
    notice.className = "cart-notice";
    notice.textContent = `${productName} agregado a tu consulta.`;
    document.body.appendChild(notice);

    setTimeout(() => {
        notice.remove();
    }, 2500);
}

filtersContainer?.addEventListener("click", event => {
    const filterButton = event.target.closest("[data-category]");

    if (!filterButton) {
        return;
    }

    activeCategory = filterButton.dataset.category;
    renderFilters();
    renderProducts();
});

productDisplay?.addEventListener("click", event => {
    const productCard = event.target.closest("[data-product-id]");

    if (!productCard) {
        return;
    }

    const product = productList.find(item => item.id === Number(productCard.dataset.productId));

    if (product) {
        renderProductDetail(product);
    }
});

productDetail?.addEventListener("click", event => {
    const backButton = event.target.closest(".backToCatalogBtn");
    const quantityButton = event.target.closest("[data-action]");

    if (backButton) {
        closeProductDetail();
        return;
    }

    if (quantityButton) {
        const input = productDetail.querySelector(".quantity-input");
        const currentValue = Number(input.value) || 1;
        const nextValue = quantityButton.dataset.action === "increase"
            ? Math.min(20, currentValue + 1)
            : Math.max(1, currentValue - 1);

        input.value = String(nextValue);
    }
});

productDetail?.addEventListener("submit", event => {
    event.preventDefault();

    const form = event.target.closest(".enquiry-form");
    const product = productList.find(item => item.id === Number(form.dataset.productId));

    if (!product || !product.availability) {
        return;
    }

    const selectedFormatId = Number(form.querySelector("input[name='formatOptions']:checked").value);
    const selectedFormat = getFormatsForProduct(product).find(format => format.id === selectedFormatId);
    const quantity = Math.max(1, Math.min(20, Number(form.querySelector(".quantity-input").value) || 1));

    addCartItem({
        productName: product.name,
        productId: product.id,
        productImg: product.img,
        selectedFormatName: selectedFormat.formato,
        selectedFormatPrice: selectedFormat.precio,
        selectedFormatId: selectedFormat.id,
        selectedQuantity: quantity
    });

    showProductAddedNotice(product.name);
});

window.addEventListener("popstate", () => {
    const productId = Number(new URLSearchParams(window.location.search).get("producto"));
    const product = productList.find(item => item.id === productId);

    if (product) {
        renderProductDetail(product, { updateHistory: false });
    } else {
        closeProductDetail({ updateHistory: false });
    }
});

renderFilters();
renderProducts();

const initialProductId = Number(new URLSearchParams(window.location.search).get("producto"));
const initialProduct = productList.find(item => item.id === initialProductId);

if (initialProduct) {
    renderProductDetail(initialProduct, { updateHistory: false });
}
