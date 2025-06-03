import { useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import GlobalContext from "./contexts/globalcontext";
import DefaultLayout from "./layouts/DefaultLayout";
import SnakeDetailPage from "./pages/SnakeDetailPage";
import SnakesPage from "./pages/SnakesPage";
import HomePage from "./components/HomePage";
import BlogPage from "./pages/blog";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import BlogPageDetails from "./pages/BlogPageDetails";
import { getCart } from "./utils/cartUtils";
import CompletePayment from "./pages/CompletePayment";
import CancelPayment from "./pages/CancelPayment";
import PaypalPayment from "./components/PaypalPayment";

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(getCart());

  return (
    <GlobalContext.Provider value={{
      isLoading,
      setIsLoading,
      isCartOpen,
      setIsCartOpen,
      cart,
      setCart

    }}>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/snakes" element={<SnakesPage />} />
            <Route path="/snakes/:slug" element={<SnakeDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPageDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/cart/checkout" element={<CheckoutPage />} />
          </Route>
          <Route path="/paypal" element={<PaypalPayment />} />
          <Route path="/paypal/complete-payment" element={<CompletePayment />} />
          <Route path="/paypal/cancel-payment" element={<CancelPayment />} />
          <Route path="*" element={<div>404</div>} /> //creare component errore 404
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  )
};

export default App;
