// src/layouts/DefaultLayout.jsx

import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { useContext } from "react";
import GlobalContext from "../contexts/globalcontext";
import Footer from "../components/Footer";
import CartAside from "../components/CartAside";


const DefaultLayout = () => {
  const { isLoading, isCartOpen, setIsCartOpen, isWishlistOpen, setIsWishlistOpen } = useContext(GlobalContext);

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleCloseWishlist = () => {
    setIsWishlistOpen(false);
  };

  return (
    <>
      <Header />
      <main className="container main-content">
        <Outlet />
      </main>
      {isLoading && <Loader />}
      <CartAside isOpen={isCartOpen} onClose={handleCloseCart} />
      
      <Footer />
    </>
  );
};

export default DefaultLayout;
