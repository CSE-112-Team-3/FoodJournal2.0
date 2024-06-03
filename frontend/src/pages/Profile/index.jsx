import NavBar from "../../components/navbar";
import ProfilePage from '../../components/profile_page'
import './Profile.css'
import { useState } from 'react';

export default function Profile() {
    const [pictureNavbar, setPictureNavbar] = useState('http://ssl.gstatic.com/accounts/ui/avatar_2x.png');

    return(
        <div className='main reddit-sans-condensed'>
            <NavBar/>
            <div className="profile-container">
                <ProfilePage setPictureNavbar={setPictureNavbar} />
            </div>        
        </div>
    );
}
