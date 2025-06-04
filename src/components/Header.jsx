import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import GlobalContext from "../contexts/globalcontext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setIsCartOpen, cart, wishlist } = useContext(GlobalContext);

  const cartItemsCount = cart?.length || 0;
  const wishlistCount = wishlist?.length || 0;

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  return (
    <header className="py-3 shadow w-100 position-relative">
      <div className="container d-flex justify-content-between align-items-center position-relative">

        {/* LOGO */}
        <div className="logo-container">
          <NavLink to="/" className="mainLogo text-decoration-none">
            <img
              src="/logo-sergente-serpente.jpg"
              alt="Logo"
              className="w-100 h-100"
            />
          </NavLink>
        </div>

        {/* HAMBURGER TOGGLE */}
        <button
          className="d-md-none btn border-0 fs-2 text-success position-absolute top-50 end-0 translate-middle-y me-3 z-3"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Menu"
        >
          <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>

        {/* MENU DESKTOP */}
        <ul className="d-none d-md-flex list-unstyled m-0 gap-5 fs-4 fw-semibold align-items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                "text-decoration-none nav-link-header ms-2" + (isActive ? " nav-link-header-active" : "")
              }
            >
              Homepage
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/snakes"
              className={({ isActive }) =>
                "text-decoration-none nav-link-header" + (isActive ? " nav-link-header-active" : "")
              }
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                "text-decoration-none nav-link-header" + (isActive ? " nav-link-header-active" : "")
              }
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                "text-decoration-none nav-link-header d-flex align-items-center position-relative" + (isActive ? " nav-link-header-active" : "")
              }
            >
              Carrello
              {/* Badge carrello: mostra il numero di oggetti nel carrello */}
              {cartItemsCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge header-badge"
                >
                  {cartItemsCount}
                  <span className="visually-hidden">elementi nel carrello</span>
                </span>
              )}
            </NavLink>
          </li>
          <li className="position-relative">
            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                "text-decoration-none nav-link-header d-flex align-items-center" + (isActive ? " nav-link-header-active" : "")
              }
            >
              <span className="me-1">Preferiti</span>
              {wishlistCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge header-badge"
                >
                  {wishlistCount}
                  <span className="visually-hidden">elementi nei preferiti</span>
                </span>
              )}
            </NavLink>
          </li>
        </ul>

        {/* MENU MOBILE */}
        <div
          className={`mobile-menu list-unstyled d-md-none position-absolute top-100 end-0 p-4 rounded shadow mt-2 ${menuOpen ? "show" : "hide"
            }`}

        >
          <li>
            <NavLink to="/" onClick={() => setMenuOpen(false)} className="d-block m-3 mb-4 text-decoration-none fs-1 nav-link-header">
              <h2>Homepage</h2>
            </NavLink>
          </li>
          <li>
            <NavLink to="/snakes" onClick={() => setMenuOpen(false)} className="d-block m-3 mb-4 text-decoration-none fs-1 nav-link-header">
              <h2>Shop</h2>
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" onClick={() => setMenuOpen(false)} className="d-block m-3 mb-4 text-decoration-none fs-1 nav-link-header">
              <h2>Blog</h2>
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart"
              className="d-block m-3 mb-4 text-decoration-none fs-1 nav-link-header"
            >
              <h2> Carrello</h2>
            </NavLink>
          </li>
          <li className="position-relative">
            <NavLink
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="d-block m-3 mb-4 text-decoration-none fs-1 nav-link-header"
            >
              <h2 className="me-2">Preferiti</h2>
              {/* <i className="fa-solid fa-heart" style={{ fontSize: "1.2rem" }}></i> eventualmente da riposizionare dentro all' h2 ^ */}

              {wishlistCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishlistCount}
                  <span className="visually-hidden">elementi nei preferiti</span>
                </span>
              )}
            </NavLink>
          </li>
        </div>

        {/* BOTTONI DESTRA */}
        <div className="d-flex align-items-center gap-3">
          {/* 🛒 Carrello */}
          <button
            className="btn btnblog"
            type="button"
            onClick={handleOpenCart}
            id="cart-button"
          >
            <span className="d-none d-md-inline me-2">Carrello</span>
            <i className="fa-solid fa-cart-shopping"></i>
            {cartItemsCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
