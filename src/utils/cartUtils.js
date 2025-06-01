const CART_KEY = "sergente_serpente_cart";

export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getCart() {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
}


export function clearCart() {
    localStorage.removeItem(CART_KEY);
}


export function removeItemFromCart(slug) {
    const currentCart = getCart();
    const updatedCart = currentCart.filter(item => item.slug !== slug);
    saveCart(updatedCart);
    return updatedCart;
}

export function addItemToCart(newItem) {
    let currentCart = getCart();
    const isItemInCart = currentCart.some(item => item.slug === newItem.slug);

    if (isItemInCart) {
        console.warn(`L'esemplare "${newItem.common_name}" è già presente nel carrello e non può essere aggiunto nuovamente.`);
        return currentCart;
    } else {
        const updatedCart = [...currentCart, newItem];
        saveCart(updatedCart);
        return updatedCart;
    }
}