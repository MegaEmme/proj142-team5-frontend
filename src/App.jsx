// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./contexts/globalcontext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout principale
import DefaultLayout from "./layouts/DefaultLayout";

// Pagine principali
import HomePage from "./components/HomePage";
import SnakesPage from "./pages/SnakesPage";
import SnakeDetailPage from "./pages/SnakeDetailPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

// Blog
import BlogPage from "./pages/blog";
import BlogPageDetails from "./pages/BlogPageDetails";

// Pagamento PayPal
import PaypalPayment from "./components/PaypalPayment";
import CompletePayment from "./pages/CompletePayment";
import CancelPayment from "./pages/CancelPayment";

// 404
import NotFound from "./components/NotFound";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <ToastContainer position="bottom-center" autoClose={3000} />
        <Routes>
          {/* Layout con header/footer/menu */}
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/snakes" element={<SnakesPage />} />
            <Route path="/snakes/:slug" element={<SnakeDetailPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/cart/checkout" element={<CheckoutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPageDetails />} />
          </Route>

          {/* Pagamenti */}
          <Route path="/paypal" element={<PaypalPayment />} />
          <Route path="/paypal/complete-payment" element={<CompletePayment />} />
          <Route path="/paypal/cancel-payment" element={<CancelPayment />} />

          {/* Pagina non trovata */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
