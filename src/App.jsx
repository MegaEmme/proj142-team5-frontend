import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalContext from "./contexts/globalcontext";
import DefaultLayout from "./layouts/DefaultLayout";
import SnakeDetailPage from "./pages/SnakeDetailPage";
import SnakesPage from "./pages/SnakesPage";
import HomePage from "./components/HomePage";
import BlogPage from "./pages/blog";
import CartPage from "./pages/CartPage";
import BlogPageDetails from "./pages/BlogPageDetails";
import { getCart } from "./utils/cartUtils";

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
          </Route>
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  )
};

export default App;
