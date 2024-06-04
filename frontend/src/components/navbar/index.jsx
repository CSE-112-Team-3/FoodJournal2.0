import './NavBar.css'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react';

export default function NavBar({ pictureNavbar }) {
    const location = useLocation();
    const { pathname } = location;

    return (
        <div className="nav-container">
            <nav className='nav-bar jockey-one-regular'>
                <div className='logo'>
                    <img src="../../public/images/nav-logo.png" alt='Food Journal Logo' />
                    <p>My Food Journal</p>
                </div>
                <ul>
                    <li className={pathname === '/' ? 'selected-page' : ''}>
                        <Link className={pathname === '/' ? 'selected-page' : ''} to='/'>HOME</Link>
                        {pathname === '/' && (
                            <div className="create-post-container">
                                <Link to="/new-review">
                                    <button className="circle-btn">Create Post</button>
                                </Link>
                            </div>
                        )}
                    </li>
                    <li className={pathname.includes('recipes') ? 'selected-page' : ''}>
                        <Link className={pathname.includes('recipes') ? 'recipes' : ''} to='/recipes'>RECIPES</Link>
                    </li>
                </ul>
                <div className='sign-in'>
                    <ul>
                        <li>
                            <Link to="/profile">
                                <img src='../../public/images/default-pfp.png' alt='Default Profile Picture' />
                            </Link>
                        </li>
                        <li>
                            <Link to='/signin'>Sign in?</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}
