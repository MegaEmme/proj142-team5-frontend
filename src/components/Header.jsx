import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();

    return (
        <header className="py-3 shadow w-100">
            <div className="container py-3">
                <ul className="d-flex list-unstyled m-0 justify-content-between align-items-center gap-5 fs-4 fw-semibold">
                    <li className="logo-container">
                        <NavLink to="/" className="text-decoration-none">
                            <img src="/logo-sergente-serpente.jpg" alt="Logo" className="img-logo" />
                        </NavLink>
                    </li>
                    <li><NavLink to="/" className="text-decoration-none">Homepage</NavLink></li>
                    <li><NavLink to="/snakes" className="text-decoration-none">Shop</NavLink></li>
                    <li><NavLink to="/blog" className="text-decoration-none">Blog</NavLink></li>
                    <li><NavLink to="/cart" className="text-decoration-none">
                        <i className="fa-solid fa-bag-shopping"></i>
                    </NavLink></li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
