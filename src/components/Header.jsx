import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="py-3 shadow w-100 position-relative">
            <div className="container d-flex justify-content-between align-items-center position-relative">

                {/* LOGO */}
                <div className="logo-container">
                    <NavLink to="/" className="text-decoration-none">
                        <img src="/logo-sergente-serpente.jpg" alt="Logo" className="img-logo" />
                    </NavLink>
                </div>

                {/* HAMBURGER TOGGLE */}
                <button
                    className="d-md-none btn border-0 fs-2 text-success position-absolute top-50 end-0 translate-middle-y me-3 z-3"
                    onClick={() => setMenuOpen(prev => !prev)}
                    aria-label="Menu"
                >
                    <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
                </button>

                {/* MENU DESKTOP */}
                <ul className="d-none d-md-flex list-unstyled m-0 gap-5 fs-4 fw-semibold">
                    <li><NavLink to="/" className="text-decoration-none">Homepage</NavLink></li>
                    <li><NavLink to="/snakes" className="text-decoration-none">Shop</NavLink></li>
                    <li><NavLink to="/blog" className="text-decoration-none">Blog</NavLink></li>
                    <li><NavLink to="/cart" className="text-decoration-none"><i className="fa-solid fa-bag-shopping"></i></NavLink></li>
                </ul>

                {/* MENU MOBILE */}
                <div
                    className={`mobile-menu list-unstyled d-md-none position-absolute top-100 end-0 p-4 rounded shadow m-0 ${menuOpen ? "show" : "hide"
                        }`}
                >
                    <li><NavLink to="/" onClick={() => setMenuOpen(false)} className="d-block m-4 text-decoration-none fs-1">Homepage</NavLink></li>
                    <li><NavLink to="/snakes" onClick={() => setMenuOpen(false)} className="d-block m-4 text-decoration-none fs-1">Shop</NavLink></li>
                    <li><NavLink to="/blog" onClick={() => setMenuOpen(false)} className="d-block m-4 text-decoration-none fs-1">Blog</NavLink></li>
                    <li><NavLink to="/cart" onClick={() => setMenuOpen(false)} className="d-block text-decoration-none m-4 fs-1"><i className="fa-solid fa-bag-shopping"></i></NavLink></li>
                </div>
            </div>
        </header>
    );
};

export default Header;
