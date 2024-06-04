import NavBar from "../../components/navbar";
import EditProfile from "../../components/editProfile";
import './Settings.css';
import { useState } from 'react';

export default function Settings() {
    const [pictureNavbar, setPictureNavbar] = useState('http://ssl.gstatic.com/accounts/ui/avatar_2x.png');

    return(
        <div className='main reddit-sans-condensed'>
            <NavBar/>
            <div className="profile-container">
                <EditProfile />
            </div>        
        </div>
    );
}
