import './NavBar.css'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react';

export default function NavBar({ pictureNavbar }) {
    const location = useLocation();
    const { hash, pathname, search } = location;
    return(
        <nav className='nav-bar jockey-one-regular'>
            <div className='logo'>
                <img src="../../public/images/nav-logo.png" alt='Food Journal Logo'/>
                <p>My Food Journal</p>
            </div>
            <ul>
                <li className={pathname == '/' ? 'selected-page' : ''}>
                    <Link className={pathname == '/' ? 'selected-page' : ''} to='/'>HOME</Link>
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
                    <li>
                        <Link to="/profile">
                            <img className = 'profileImage' src= {pictureNavbar || '../../public/images/default-pfp.png'} alt='Default Profile Picture'/>
                        </Link>
                    </li>
                    <li>
                        {/* TO DO: once frontend has access to user token, 
                        change this to switch btwn user's logout/username
                        & sign in link if not logged in */}
                        <Link to='/signin'>Sign in?</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}