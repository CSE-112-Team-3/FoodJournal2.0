import './NavBar.css'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useAuth } from '../../provider/AuthProvider.jsx';

export default function NavBar({ pictureNavbar }) {
    const location = useLocation();
    const { pathname } = location;
    const { isAuthenticated, accessToken, user } = useAuth();
    console.log(accessToken, isAuthenticated, user);

    const handleLogOut = (e) => {
        e.preventDefault();
    }

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
                    <li className={pathname.includes('discover') ? 'selected-page' : ''}>
                        <Link className={pathname.includes('discover') ? 'selected-page' : ''} to='/discover'>DISCOVER</Link>
                    </li>
                    <li className={pathname.includes('settings') ? 'selected-page' : ''}>
                        <Link className={pathname.includes('settings') ? 'selected-page' : ''} to='/settings'>SETTINGS</Link>
                    </li>
                </ul>
                <div className='sign-in'>
                    <ul>
                        {isAuthenticated ? 
                            <>
                                <li>
                                    <Link to="/profile">
                                        <img src={user.profile_picture ? user.profile_picture : '../../public/images/default-pfp.png'} alt='Default Profile Picture' />
                                    </Link>
                                </li>
                                <li>
                                    <p>Hi, {user.username}!</p>
                                </li>
                                <li>
                                    <button className='circle-btn' onSubmit={handleLogOut}>Log out?</button>
                                </li>
                            </>
                        : <li>
                            <Link to='/signin'>Sign in?</Link>
                        </li> }
                    </ul>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}
