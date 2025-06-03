const WISHLIST_KEY = "sergente_wishlist";

// Recupera la wishlist dal localStorage
export function getWishlist() {
  const saved = localStorage.getItem(WISHLIST_KEY);
  return saved ? JSON.parse(saved) : [];
}

// Salva la wishlist nel localStorage
export function saveWishlist(wishlist) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

// Aggiunge un elemento alla wishlist
export function addItemToWishlist(item) {
  const wishlist = getWishlist();
  const exists = wishlist.some(el => el.slug === item.slug);
  if (!exists) {
    const updated = [...wishlist, item];
    saveWishlist(updated);
    return updated;
  }
  return wishlist;
}

// Rimuove un elemento dalla wishlist
export function removeItemFromWishlist(slug) {
  const wishlist = getWishlist();
  const updated = wishlist.filter(item => item.slug !== slug);
  saveWishlist(updated);
  return updated;
}
