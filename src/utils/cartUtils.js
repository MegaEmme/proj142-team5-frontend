// src/utils/cartUtils.js
const CART_KEY = "sergente_serpente_cart";

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function isItemInCart(id) {
  const cart = getCart();
  return cart.some(item => item.id === id);
}

export function addItemToCart(item) {
  const cart = getCart();
  if (!cart.some(el => el.slug === item.slug)) {
    const updated = [...cart, item];
    saveCart(updated);
    return updated;
  }
  return cart;
}

export function removeItemFromCart(slug) {
  const cart = getCart();
  const updated = cart.filter(item => item.slug !== slug);
  saveCart(updated);
  return updated;
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}
