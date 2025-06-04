import { createContext, useState, useEffect } from "react";
import { getCart, saveCart } from "../utils/cartUtils";
import { getWishlist, saveWishlist } from "../utils/wishlistUtils";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);

  const [cartInitialized, setCartInitialized] = useState(false);
  const [wishlistInitialized, setWishlistInitialized] = useState(false);

  // ✅ Carica localStorage solo una volta
  useEffect(() => {
    setCart(getCart());
    setCartInitialized(true);

    setWishlist(getWishlist());
    setWishlistInitialized(true);
  }, []);

  // ✅ Salva nel localStorage solo dopo che è stato inizializzato
  useEffect(() => {
    if (cartInitialized) {
      saveCart(cart);
    }
  }, [cart, cartInitialized]);

  useEffect(() => {
    if (wishlistInitialized) {
      saveWishlist(wishlist);
    }
  }, [wishlist, wishlistInitialized]);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isCartOpen,
        setIsCartOpen,
        cart,
        setCart,
        wishlist,
        setWishlist,
        submittedData,
        setSubmittedData
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
