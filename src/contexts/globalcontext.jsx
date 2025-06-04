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

  useEffect(() => {
    setCart(getCart());
    setWishlist(getWishlist());
  }, []);

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  useEffect(() => {
    saveWishlist(wishlist);
  }, [wishlist]);

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
