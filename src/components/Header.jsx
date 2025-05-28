import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <>
<<<<<<< HEAD
            <header className="bg-success-subtle py-3 mb-2 position-fixed shadow w-100 z-3">
                <div className="container">
                    <ul className="d-flex list-unstyled m-o justify-content-between align-items-center mx-5 fs-4 fw-bold">
=======
            <header className=" py-3 mb-2 position-fixed shadow w-100 z-3">
                <div className="container d-flex justify-content-between align-items-center">
                    <div>Sergente Serpente</div>
                    <ul className="d-flex list-unstyled m-o gap-2">
>>>>>>> homepage
                        <li>
                            <NavLink to='/' className="text-decoration-none">Sergente Serpente</NavLink>
                        </li>
                        <li>
                            <NavLink to='/api/snakes' className="text-decoration-none">Serpenti</NavLink>
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