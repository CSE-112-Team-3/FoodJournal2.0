import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../provider/AuthProvider.jsx';
import './NavBar.css'
import ProfilePic from '../profilePic/index.jsx';
import defaultPicture from '../../assets/blankProfile.png';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    const location = useLocation();
    const { pathname } = location;
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = async(e) => {
        e.preventDefault();
        try {
            await logout();
        } catch(error) {
        }
    }

    const handleProfileClick = (e) => {
        e.preventDefault();
        // console.log(user)
        navigate('/mypage', { state: { username: user.username, userId: user.id, profile_picture: user.profile_picture } });
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
                            <Link className={pathname.includes('settings') ? 'selected-page' : ''} to='/settings'>PROFILE</Link>
                        </li>
                    )}
                </ul>
                <div className='sign-in'>
                    <ul>
                        {isAuthenticated ? 
                            <>
                                <li id='profile-pic'onClick={handleProfileClick}>
                                    <ProfilePic 
                                        username={user?.username} 
                                        imageAddress={user?.profile_picture || defaultPicture} 
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
