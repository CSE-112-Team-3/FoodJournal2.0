import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../provider/AuthProvider.jsx';
import './NavBar.css'
import ProfilePic from '../profilePic/index.jsx';

export default function NavBar() {
    const location = useLocation();
    const { pathname } = location;
    const { isAuthenticated, user, logout } = useAuth();
    const handleLogOut = async(e) => {
        e.preventDefault();
        try {
            await logout();
        } catch(error) {
        }
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
                        {isAuthenticated && pathname === '/' && (
                            <div className="create-post-container">
                                <Link to="/new-review">
                                    <button className="circle-btn jockey-one-regular">Create Post</button>
                                </Link>
                            </div>
                        )}
                    </li>
                    <li className={pathname.includes('recipes') ? 'selected-page' : ''}>
                        <Link className={pathname.includes('recipes') ? 'selected-page' : ''} to='/recipes'>RECIPES</Link>
                    </li>
                    {isAuthenticated && (
                        <li className={pathname.includes('settings') ? 'selected-page' : ''}>
                            <Link className={pathname.includes('settings') ? 'selected-page' : ''} to='/settings'>SETTINGS</Link>
                        </li>
                    )}
                </ul>
                <div className='sign-in'>
                    <ul>
                        {isAuthenticated ? 
                            <>
                                <li>
                                    <ProfilePic 
                                        username={user?.username} 
                                        imageAddress={user?.profile_picture || '../../public/images/default-pfp.png'} 
                                        size={100} 
                                    />
                                </li>
                                <li>
                                    <p>Hi {user?.username}!</p>
                                </li>
                                <li>
                                    <button className='circle-btn jockey-one-regular' onClick={handleLogOut}>Log out?</button>
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
