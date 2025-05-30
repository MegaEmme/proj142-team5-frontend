const CART_KEY = "sergente_serpente_cart";

//salva il carrello nel localstorage

export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

//recupera il carrello dal localstorage

export function getCart() {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
};

//rimuove il carrello dal localsotrage

export function clearCart() {
    localStorage.removeItem(CART_KEY);
};