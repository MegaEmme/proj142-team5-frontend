const WISHLIST_KEY = "sergente_wishlist";

export function saveWishlist(wishlist) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

export function getWishlist() {
  const saved = localStorage.getItem(WISHLIST_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function isItemInWishlist(slug) {
  const wishlist = getWishlist();
  return wishlist.some(item => item.slug === slug);
}

export function addItemToWishlist(item) {
  const wishlist = getWishlist();
  if (!wishlist.some(el => el.slug === item.slug)) {
    const updated = [...wishlist, item];
    saveWishlist(updated);
    return updated;
  }
  return wishlist;
}

export function removeItemFromWishlist(slug) {
  const wishlist = getWishlist();
  const updated = wishlist.filter(item => item.slug !== slug);
  saveWishlist(updated);
  return updated;
}
