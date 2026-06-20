import {
    formatCurrency,
    getCartItems,
    getCartSummary,
    getWhatsappUrl,
    removeCartItem,
    updateCartItemQuantity
} from "./cartUtils.js";

const cartToggle = document.getElementById("shopping-cart-icon-container");
const cartCount = document.getElementById("shopping-cart-icon-count");
let basketPanel = null;

function updateCartCount() {
    const { totalItems } = getCartSummary();

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

function closeBasket() {
    basketPanel?.remove();
    basketPanel = null;
    cartToggle?.setAttribute("aria-expanded", "false");
}

function renderBasketItems(items) {
    if (!items.length) {
        return `
            <div class="basket-empty">
                <p>Tu consulta está vacía.</p>
                <a class="secondary-link" href="productos.html">Ver productos</a>
            </div>
        `;
    }

    return items.map(item => {
        const total = item.selectedQuantity * item.selectedFormatPrice;

        return `
            <article class="product-shoppingCart">
                <img class="productImg-shoppingCart" src="${item.productImg}" alt="${item.productName}">
                <div class="productInfo-shoppingCart">
                    <h3 class="productName-shoppingCart">${item.productName}</h3>
                    <p class="productFormat-shoppingCart">${item.selectedFormatName}</p>
                    <p class="productPrice-shoppingCart">Unidad: ${formatCurrency(item.selectedFormatPrice)}</p>
                    <div class="basket-quantity-group">
                        <span>Cantidad</span>
                        <div class="basket-quantity-controls">
                            <button class="basket-quantity-button" type="button" data-action="decrease" data-product-id="${item.productId}" data-format-id="${item.selectedFormatId}">-</button>
                            <input class="basket-quantity-input" type="number" min="1" max="20" value="${item.selectedQuantity}" data-product-id="${item.productId}" data-format-id="${item.selectedFormatId}">
                            <button class="basket-quantity-button" type="button" data-action="increase" data-product-id="${item.productId}" data-format-id="${item.selectedFormatId}">+</button>
                        </div>
                    </div>
                    <div class="productTotalPrice-shoppingcart">
                        <span>Total</span>
                        <strong>${formatCurrency(total)}</strong>
                    </div>
                    <button class="deleteFromCart" type="button" data-product-id="${item.productId}" data-format-id="${item.selectedFormatId}">
                        Eliminar
                    </button>
                </div>
            </article>
        `;
    }).join("");
}

function renderBasket() {
    const items = getCartItems();
    const { totalPrice } = getCartSummary(items);

    if (!basketPanel) {
        basketPanel = document.createElement("aside");
        basketPanel.id = "shoppingCart";
        basketPanel.setAttribute("aria-label", "Consulta de productos");
        document.body.appendChild(basketPanel);
    }

    basketPanel.innerHTML = `
        <div class="basket-header">
            <div>
                <p class="eyebrow">Consulta</p>
                <h2 id="shoppingCartTitle">Tu selección</h2>
            </div>
            <button class="basket-close" type="button" aria-label="Cerrar consulta">&times;</button>
        </div>
        <div id="productsInShoppingCart">${renderBasketItems(items)}</div>
        <div id="shoppingCartTotals">
            <span>Total estimado</span>
            <strong>${formatCurrency(totalPrice)}</strong>
        </div>
        <div class="basket-actions">
            <a class="primary-action" href="${getWhatsappUrl(items)}" target="_blank" rel="noopener">Consultar por WhatsApp</a>
            <a class="secondary-action" href="consulta.html">Usar formulario</a>
        </div>
    `;
}

function toggleBasket() {
    if (basketPanel) {
        closeBasket();
        return;
    }

    renderBasket();
    cartToggle?.setAttribute("aria-expanded", "true");
}

cartToggle?.addEventListener("click", toggleBasket);

document.body.addEventListener("click", event => {
    if (event.target.closest(".basket-close")) {
        closeBasket();
    }

    const deleteButton = event.target.closest(".deleteFromCart");

    if (deleteButton) {
        removeCartItem(deleteButton.dataset.productId, deleteButton.dataset.formatId);
        renderBasket();
        return;
    }

    const quantityButton = event.target.closest(".basket-quantity-button");

    if (quantityButton) {
        const matchingInput = basketPanel.querySelector(`.basket-quantity-input[data-product-id="${quantityButton.dataset.productId}"][data-format-id="${quantityButton.dataset.formatId}"]`);
        const currentQuantity = Number(matchingInput?.value) || 1;
        const nextQuantity = quantityButton.dataset.action === "increase"
            ? Math.min(20, currentQuantity + 1)
            : Math.max(1, currentQuantity - 1);

        updateCartItemQuantity(quantityButton.dataset.productId, quantityButton.dataset.formatId, nextQuantity);
        renderBasket();
    }
});

function handleQuantityEdit(event) {
    if (!event.target.matches(".basket-quantity-input")) {
        return;
    }

    updateCartItemQuantity(event.target.dataset.productId, event.target.dataset.formatId, event.target.value);
    renderBasket();
}

document.body.addEventListener("input", handleQuantityEdit);
document.body.addEventListener("change", handleQuantityEdit);

document.addEventListener("DOMContentLoaded", updateCartCount);
window.addEventListener("cart:updated", updateCartCount);
