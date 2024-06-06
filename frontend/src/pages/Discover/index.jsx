import NavBar from "../../components/navbar";
import { useState } from 'react';

export default function Discover() {
    const [navbarPic, setNavbarPic] = useState('http://ssl.gstatic.com/accounts/ui/avatar_2x.png');
    //TODO: Retrieve the image link from the database to replace the link in 'useState'.
    return(
        <>
            <NavBar pictureNavbar = {navbarPic}/>
            <h1>Discover</h1>
        </>
    );
}