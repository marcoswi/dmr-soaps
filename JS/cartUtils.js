const CART_ITEMS_KEY = "userSelection";
const CART_TOTAL_KEY = "totalPriceInCart";
const CART_COUNT_KEY = "totalProductsInCart";
export const WHATSAPP_NUMBER = "5491141849597";

export function formatCurrency(value) {
    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0
    }).format(Number(value) || 0);
}

export function getCartItems() {
    try {
        const items = JSON.parse(localStorage.getItem(CART_ITEMS_KEY));
        return Array.isArray(items) ? items : [];
    } catch (error) {
        return [];
    }
}

export function getCartSummary(items = getCartItems()) {
    return items.reduce((summary, item) => {
        const quantity = Number(item.selectedQuantity) || 0;
        const price = Number(item.selectedFormatPrice) || 0;

        summary.totalItems += quantity;
        summary.totalPrice += quantity * price;

        return summary;
    }, { totalItems: 0, totalPrice: 0 });
}

export function saveCartItems(items) {
    const summary = getCartSummary(items);

    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items));
    localStorage.setItem(CART_TOTAL_KEY, JSON.stringify(summary.totalPrice));
    localStorage.setItem(CART_COUNT_KEY, JSON.stringify(summary.totalItems));
    window.dispatchEvent(new CustomEvent("cart:updated", { detail: summary }));

    return summary;
}

export function addCartItem(item) {
    const items = getCartItems();
    const existingItem = items.find(savedItem =>
        savedItem.productId === item.productId &&
        savedItem.selectedFormatId === item.selectedFormatId
    );

    if (existingItem) {
        existingItem.selectedQuantity += item.selectedQuantity;
    } else {
        items.push(item);
    }

    saveCartItems(items);
}

export function removeCartItem(productId, formatId) {
    const items = getCartItems().filter(item =>
        !(String(item.productId) === String(productId) && String(item.selectedFormatId) === String(formatId))
    );

    saveCartItems(items);
}

export function updateCartItemQuantity(productId, formatId, quantity) {
    const nextQuantity = Math.max(1, Number(quantity) || 1);
    const items = getCartItems().map(item => {
        if (String(item.productId) === String(productId) && String(item.selectedFormatId) === String(formatId)) {
            return { ...item, selectedQuantity: nextQuantity };
        }

        return item;
    });

    saveCartItems(items);
}

export function buildEnquiryMessage(items = getCartItems()) {
    if (!items.length) {
        return "Hola DMR Soaps, me gustaría consultar disponibilidad de sus jabones naturales.";
    }

    const { totalPrice } = getCartSummary(items);
    const lines = [
        "Hola DMR Soaps, quisiera consultar disponibilidad de estos productos:",
        ""
    ];

    items.forEach(item => {
        const lineTotal = item.selectedQuantity * item.selectedFormatPrice;
        lines.push(
            `- ${item.productName} (${item.selectedFormatName}) x ${item.selectedQuantity}: ${formatCurrency(lineTotal)}`
        );
    });

    lines.push("", `Total estimado: ${formatCurrency(totalPrice)}`);
    lines.push("Muchas gracias.");

    return lines.join("\n");
}

export function getWhatsappUrl(items = getCartItems()) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildEnquiryMessage(items))}`;
}
