import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Mostra il bottone solo se NON siamo sulla home
  const showBackHome = location.pathname !== "/";

  return (
    <>
      <header className="py-3 shadow w-100 z-3">
        <div className="container">
          <ul className="d-flex list-unstyled m-0 justify-content-between align-items-center mx-5 fs-2 fw-bold">
            <li className="logo-container">
              <NavLink to="/" className="text-decoration-none">
                <img src="/logo-sergente-serpente.jpg" alt="Logo" className="img-logo me-3" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/snakes" className="text-decoration-none">shop</NavLink>
            </li>
            <li>
              <NavLink to="/blog" className="text-decoration-none">blog</NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="text-decoration-none">
                <i className="fa-solid fa-bag-shopping"></i>
              </NavLink>
            </li>
          </ul>
        </div>

        {showBackHome && (
          <div className="container mt-2">
            <button className="btn btn-outline-secondary" onClick={() => navigate("/")}>
              Torna alla Home
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
