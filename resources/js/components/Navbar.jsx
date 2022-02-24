import React from 'react';
import {NavLink} from "react-router-dom";
import {useAuth} from '../features/Authentication/AuthContext';
import {useHistory, useLocation} from 'react-router-dom';

const Navbar = () => {
    const {logout, user} = useAuth();
    let {pathname} = useLocation();

    // <button onClick={logout}>Logout</button>
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand" to={"/"}>HD CRM SYSTEM</NavLink>
                <button className="navbar-toggler me-2 m-auto" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className={`nav-link ${pathname === '/products' ? 'active' : '' }`} aria-current="page" to="/products">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={`nav-link ${pathname === '/categories' ? 'active' : '' }`} aria-current="page"
                                     to="/categories">Categories</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={`nav-link ${pathname === '/accounts' ? 'active' : '' }`} aria-current="page" to="/accounts">Accounts</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={`nav-link ${pathname === '/customers' ? 'active' : '' }`} aria-current="page" to="/customers">Customers</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={`nav-link ${pathname === '/stocks' ? 'active' : '' }`} aria-current="page" to="/stocks">Stocks</NavLink>
                        </li>
                    </ul>

                </div>
                <div className='me-2'>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown active">
                            <a className={`nav-link`} href="#" id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                {user.name}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                                <li>
                                    <button className="dropdown-item" onClick={logout}>Logout</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
