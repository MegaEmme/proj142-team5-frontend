import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalContext from "./contexts/globalcontext";
import DefaultLayout from "./layouts/DefaultLayout";
import SnakeDetailPage from "./pages/SnakeDetailPage";
import SnakesPage from "./pages/SnakesPage";

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
            <Route path="/" element={<div>HomePage</div>} />
            <Route path="/api/snakes" element={<SnakesPage />} />
            <Route path="/api/snakes/:slug" element={<SnakeDetailPage />} />
          </Route>
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  )
};

export default App;
