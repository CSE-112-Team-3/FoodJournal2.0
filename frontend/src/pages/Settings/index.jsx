import NavBar from "../../components/navbar";
import EditProfile from "../../components/editProfile";
import './Settings.css';
import { useState } from 'react';

export default function Settings() {
    return(
        <div className='main reddit-sans-condensed'>
            <NavBar/>
            <div className="profile-container">
                <EditProfile />
            </div>        
        </div>
    );
}
