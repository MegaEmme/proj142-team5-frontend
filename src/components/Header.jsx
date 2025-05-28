import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <>
            <header className="py-3 shadow w-100 z-3">
                <div className="container">
                    <ul className="d-flex list-unstyled m-o justify-content-between align-items-center mx-5 fs-2 fw-bold">
                        <li className="logo-container">
                            <NavLink to='/' className="text-decoration-none"><img src="/logo-sergente-serpente.jpg" alt="" className="img-logo me-3" /></NavLink>
                        </li>
                        <li>
                            <NavLink to='/snakes' className="text-decoration-none">shop</NavLink>
                        </li>
                        <li>
                            <NavLink to='/blog' className="text-decoration-none">blog</NavLink>
                        </li>
                        <li>
                            <NavLink to='/cart' className="text-decoration-none"><i class="fa-solid fa-bag-shopping"></i></NavLink>
                        </li>
                    </ul>
                </div>
            </header>
            <div className="height-header"></div>
        </>
    )
};

export default Header;