import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { useContext } from "react";
import GlobalContext from "../contexts/globalcontext";

const DefaultLayout = () => {
  const { isLoading } = useContext(GlobalContext);

  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      {isLoading && <Loader />}
    </>
  );
};

export default DefaultLayout;
