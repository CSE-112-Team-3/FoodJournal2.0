import './NavBar.css'
import { Outlet, Link } from 'react-router-dom'
export default function NavBar() {
    return(
        <nav className='nav-bar jockey-one-regular'>
            <div className='logo'>
                <img src="../../public/images/nav-logo.png" alt='Food Journal Logo'/>
                <p>My Food Journal</p>
            </div>
            <ul className='page-directory'>
                <li>
                    <Link to='/'>HOME</Link>
                </li>
                <li>
                    <Link to='/discover'>DISCOVER</Link>
                </li>
                <li>
                    <Link to='/settings'>SETTINGS</Link>
                </li>
            </ul>
            <div className='sign-in'>
                <ul>
                    <li>
                        <img src='../../public/images/default-pfp.png' alt='Default Profile Picture'/>
                    </li>
                    <li>
                    <Link to='/signin'>Sign in?</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}