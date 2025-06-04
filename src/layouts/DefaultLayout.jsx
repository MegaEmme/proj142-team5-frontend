import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import CartAside from "../components/CartAside";
import { useContext } from "react";
import GlobalContext from "../contexts/globalcontext";

const DefaultLayout = () => {
  const {
    isLoading,
    isCartOpen,
    setIsCartOpen,
    isWishlistOpen,
    setIsWishlistOpen,
  } = useContext(GlobalContext);

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
      {/* puoi aggiungere WishlistAside se serve */}
      <Footer />
    </>
  );
};

export default DefaultLayout;
