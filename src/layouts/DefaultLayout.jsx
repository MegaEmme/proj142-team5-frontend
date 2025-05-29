import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { useContext } from "react";
import GlobalContext from "../contexts/globalcontext";
import Footer from "../components/Footer";

const DefaultLayout = () => {
  const { isLoading } = useContext(GlobalContext);

  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      {isLoading && <Loader />}
      <Footer />
    </>
  );
};

export default DefaultLayout;
