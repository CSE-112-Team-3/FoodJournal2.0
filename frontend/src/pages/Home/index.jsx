import './Home.css'
import NavBar from '../../components/navbar'
import { useState } from 'react';

export default function Home() {
    const [navbarPic, setNavbarPic] = useState('http://ssl.gstatic.com/accounts/ui/avatar_2x.png');
    //TODO: Retrieve the image link from the database to replace this link: 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png'.
    
    return(
        <div>
            <NavBar pictureNavbar = {navbarPic}/> 
            <h1>Home</h1>
        </div>
    );
}