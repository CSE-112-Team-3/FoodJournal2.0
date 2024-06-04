import NavBar from "../../components/navbar";
import ProfilePage from '../../components/profile_page'
import './Settings.css'
import { useState } from 'react';

export default function Profile() {
    const [pictureNavbar, setPictureNavbar] = useState('http://ssl.gstatic.com/accounts/ui/avatar_2x.png');

    return(
        <div className='main'>
            <NavBar pictureNavbar={pictureNavbar} />
            <ProfilePage setPictureNavbar={setPictureNavbar} className='page'/>
        </div>
    );
}