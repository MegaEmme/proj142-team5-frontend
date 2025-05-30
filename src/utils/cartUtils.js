const CART_KEY = "sergente_serpente_cart";

// Salva il carrello nel localStorage
export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Recupera il carrello dal localStorage
export function getCart() {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
}

// Rimuove il carrello dal localStorage
export function clearCart() {
    localStorage.removeItem(CART_KEY);
}

// Rimuove un singolo elemento dal carrello per nome
export function removeItemFromCart(slug) {
    const currentCart = getCart();
    const updatedCart = currentCart.filter(item => item.slug !== slug);
    saveCart(updatedCart);
    return updatedCart;
}