import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <>
            <header className="bg-success-subtle py-3 mb-2 position-fixed shadow w-100 z-3">
                <div className="container">
                    <ul className="d-flex list-unstyled m-o justify-content-between align-items-center mx-5 fs-2 fw-bold">
                        <li className="logo-container">
                            <NavLink to='/' className="text-decoration-none"><img src="/logo-sergente-serpente.jpg" alt="" className="img-logo me-3" /></NavLink>
                        </li>
                        <li>
                            <NavLink to='/api/snakes' className="text-decoration-none">shop</NavLink>
                        </li>
                        <li>
                            <NavLink to='/api/snakes/:slug' className="text-decoration-none">Serpente</NavLink>
                        </li>
                        <li>
                            <NavLink to='/api/blog' className="text-decoration-none">blog</NavLink>
                        </li>
                        <li>
                            <NavLink to='/api/cart' className="text-decoration-none"><i class="fa-solid fa-bag-shopping"></i></NavLink>
                        </li>
                    </ul>
                </div>
            </header>
            <div className="height-header"></div>
        </>
    )
};

export default Header;