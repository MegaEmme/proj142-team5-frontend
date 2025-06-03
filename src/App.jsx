import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./contexts/globalcontext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DefaultLayout from "./layouts/DefaultLayout";
import SnakeDetailPage from "./pages/SnakeDetailPage";
import SnakesPage from "./pages/SnakesPage";
import HomePage from "./components/HomePage";
import BlogPage from "./pages/blog";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import BlogPageDetails from "./pages/BlogPageDetails";
import WishlistPage from "./pages/WishlistPage";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        {/* ✅ Mostra toast in ogni pagina */}
        <ToastContainer position="bottom-center" autoClose={3000} />


        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/snakes" element={<SnakesPage />} />
            <Route path="/snakes/:slug" element={<SnakeDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPageDetails />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/cart/checkout" element={<CheckoutPage />} />
          </Route>
          <Route path="*" element={<div>404 - Pagina non trovata</div>} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
