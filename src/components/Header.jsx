import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <>
            <header className="bg-success-subtle py-3 mb-2 position-fixed shadow w-100 z-3">
                <div className="container d-flex justify-content-between align-items-center">
                    <div>Sergente Serpente</div>
                    <ul className="d-flex list-unstyled m-o gap-2">
                        <li>
                            <NavLink to='/'>Home Page</NavLink>
                        </li>
                        <li>
                            <NavLink to='/api/snakes'>Serpenti</NavLink>
                        </li>
                        <li>
                            <NavLink to='/api/snakes/:slug'>Serpente</NavLink>
                        </li>
                    </ul>
                </div>
            </header>
            <div className="height-header"></div>
        </>
    )
};

export default Header;