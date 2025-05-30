import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { useContext } from "react";
import GlobalContext from "../contexts/globalcontext";
import Footer from "../components/Footer";
import CartAside from "../components/CartAside";

const DefaultLayout = () => {
  const { isLoading, isCartOpen, setIsCartOpen } = useContext(GlobalContext);

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      {isLoading && <Loader />}
      <CartAside isOpen={isCartOpen} onClose={handleCloseCart} />
      <Footer />
    </>
  );
};

export default DefaultLayout;
