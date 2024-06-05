import './NavBar.css'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../provider/AuthProvider.jsx';
<<<<<<< 81-frontend-profile-page-settings
// import 'ldrs/tailspin';
=======
//import 'ldrs/tailspin';
>>>>>>> main

export default function NavBar() {
    const location = useLocation();
    const { pathname } = location;
    const { isAuthenticated, user, isLoading } = useAuth();
    console.log(isAuthenticated, !isLoading, !user, isAuthenticated && (isLoading || !user))
    // if (isAuthenticated) {
    //     if(!user || isLoading) {
    //         return <l-tailspin
    //             size="50"
    //             stroke="6"
    //             speed="0.9"
    //             color="black" 
    //         />
    //     }
    // }

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
                                    <Link to="/profile">
                                        <img 
                                            src={user?.profile_picture ? user.profile_picture : '../../public/images/default-pfp.png'} 
                                            alt='Default Profile Picture' 
                                            style={{width: '100px', borderRadius: '50%'}}
                                        />
                                    </Link>
                                </li>
                                <li>
                                    <p>Hi {user?.username}!</p>
                                </li>
                                <li>
                                    <button className='circle-btn jockey-one-regular' onSubmit={handleLogOut}>Log out?</button>
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
