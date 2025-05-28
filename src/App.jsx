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

function App() {

  const [isLoading, setIsLoading] = useState(false);
  return (
    <GlobalContext.Provider value={{
      isLoading,
      setIsLoading
    }}>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/api/snakes" element={<SnakesPage />} />
            <Route path="/api/snakes/:slug" element={<SnakeDetailPage />} />
            <Route path="/api/blog" element={<BlogPage />} />
            <Route path="/api/blog/:id" element={<BlogPageDetails />} />
            <Route path="/api/cart" element={<CartPage />} />
          </Route>
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  )
};

export default App;
