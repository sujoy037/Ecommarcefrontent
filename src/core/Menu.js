import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const isActive = (currentPath, path) => {
    return currentPath === path ? { color: '#ff9900' } : { color: '#ffffff' };
};

const Menu = () => {
    const navigate = useNavigate();
    const currentPath = window.location.pathname;

    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" to="/" style={isActive(currentPath, '/')}>
                        Home
                    </Link>
                </li>
                {!isAuthenticated() && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup" style={isActive(currentPath, '/signup')}>
                                Signup
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signin" style={isActive(currentPath, '/signin')}>
                                Signin
                            </Link>
                        </li>
                    </>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/user/dashboard" style={isActive(currentPath, '/user/dashboard')}>
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" style={{ cursor: "pointer", color: "#ffffff" }}
                            onClick={() => signout(() => navigate('/'))}>
                                Logout
                            </span>
                        </li>
                    </>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/dashboard" style={isActive(currentPath, '/admin/dashboard')}>
                                Admin Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" style={{ cursor: "pointer", color: "#ffffff" }}
                            onClick={() => signout(() => navigate('/'))}>
                                Logout
                            </span>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Menu;
