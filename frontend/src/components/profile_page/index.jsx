import React from 'react';
import './profile.css';
import { useState, useEffect } from 'react';

export default function ProfilePage({ setPictureNavbar }) {
    const [profileImage, setProfileImage] = useState('http://ssl.gstatic.com/accounts/ui/avatar_2x.png'); //TODO: need to get the image from database
    const [firstName, setFirstName] = useState(''); //TODO: need to get the first name from the database.
    const [lastName, setLastName] = useState(''); //TODO: need to get the last name from the database.
    const [userName, setUserName] = useState(''); //TODO: need to get the username from the database.
    const [email, setEmail] = useState(''); //TODO: need to get the email from the database.
    const [mobile, setMobile] = useState('');
    const [favoriteFoods, setFoods] = useState('');
    const [newPassword, setPassword] = useState('');
    //The information above should be stored in the database when the form is submitted.

    const [verifyPassword, comfirmPassword] = useState('');
    const [invalidUsername, printUsernameErrorMessage] = useState('');
    const [invalidEmail, printEmailErrorMessage] = useState('');
    const [invalidPassword, printPasswordErrorMessage] = useState('');
    const [profileImage_copy, setImage] = useState('http://ssl.gstatic.com/accounts/ui/avatar_2x.png');

    useEffect(() => {
        setPictureNavbar(profileImage);
    }, [profileImage, setPictureNavbar]);

    const handlePictureChange = (event)=>{
        const pic = event.target.files[0];
        if(pic){
            const reader = new FileReader();
            reader.readAsDataURL(pic);
            reader.onload = function(e) {
                setImage(e.target.result);
            };
        }
    }
    const handleFirstNameChange = (event)=>{
        setFirstName(event.target.value);
    }
    const handleLastNameChange = (event)=>{
        setLastName(event.target.value);
    }
    const handleUsernameChange = (event)=>{
        setUserName(event.target.value);
    }
    const handleMobileChange = (event)=>{
        setMobile(event.target.value);
    }
    const handleEmailChange = (event)=>{
        setEmail(event.target.value);
    }
    const handleFoodChange = (event)=>{
        setFoods(event.target.value);
    }
    const handlePasswordChange = (event)=>{
        setPassword(event.target.value);
    }
    const VerifyNewPassword = (event)=>{
        comfirmPassword(event.target.value);
    }

    const isValidEmail = (email)=>{
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    const isValidUsername = (username) => {
        const regex = /\d/; 
        return regex.test(username) && ((username.length) >= 5);
    };

    const handleSubmit = (event)=>{
        event.preventDefault();

        printPasswordErrorMessage('');
        printEmailErrorMessage('');
        printUsernameErrorMessage('');

        if(newPassword !== verifyPassword){
            printPasswordErrorMessage('Passwords do not match');
            return;
        }

        if(!isValidEmail(email)){
            printEmailErrorMessage('Invalid email address');
            return;
        }

        if(!isValidUsername(userName)){
            printUsernameErrorMessage('Username must be at least 5 characters long and contain at least 1 number');
            return;
        }
        setProfileImage(profileImage_copy);

        //TODO: submit the form, and store all the information in the database
    }

    return (
        <div className="profilePage">
            <div className="text-center">
                <img src={profileImage_copy} className="profile_image" alt="avatar" />
                <h6>Upload Your Profile Picture</h6>
                <input type="file" className="file-upload" onChange={handlePictureChange}/>
            </div>
            <form className="form" id="registrationForm" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="first_name"><h4>First name</h4></label>
                    <input value = {firstName} onChange={handleFirstNameChange} type="text" className="form-control" name="first_name" id="first_name" placeholder="first name" />
                    <p>{''}</p>
                </div>
                <div>
                    <label htmlFor="last_name"><h4>Last name</h4></label>
                    <input value = {lastName} onChange={handleLastNameChange} type="text" className="form-control" name="last_name" id="last_name" placeholder="last name" />
                    <p>{''}</p>
                </div>
                <div>
                    <label htmlFor="username"><h4>Username</h4></label>
                    <input value = {userName} onChange={handleUsernameChange} type="text" className="form-control" name="username" id="phone" placeholder="current username" />
                    <p>{invalidUsername}</p>
                </div>
                <div>
                    <label htmlFor="mobile"><h4>Mobile</h4></label>
                    <input value = {mobile} onChange={handleMobileChange} type="text" className="form-control" name="mobile" id="mobile" placeholder="enter mobile number" />
                    <p>{''}</p>
                </div>
                <div>
                    <label htmlFor="email"><h4>Email</h4></label>
                    <input value = {email} onChange={handleEmailChange} type="email" className="form-control" name="email" id="email" placeholder="you@email.com" />
                    <p>{invalidEmail}</p>
                </div>
                <div>
                    <label htmlFor="favoriteFoods"><h4>Favorite Foods</h4></label>
                    <input value = {favoriteFoods} onChange={handleFoodChange} type="text" className="form-control" id="favoriteFoods" placeholder="enter your favorite foods" />
                    <p>{''}</p>
                </div>
                <div>
                    <label htmlFor="password"><h4>New Password</h4></label>
                    <input onChange={handlePasswordChange} type="password" className="form-control" name="password" id="password" placeholder="password" />
                    <p>{''}</p>
                </div>
                <div>
                    <label htmlFor="password2"><h4>Verify</h4></label>
                    <input onChange={VerifyNewPassword} type="password" className="form-control" name="password2" id="password2" placeholder="verify password" />
                    <p>{invalidPassword}</p>
                </div>
                <div>
                    <br/>
                    <button className="submitButton" type="submit"> Save</button>
                    {/* <button className="resetButton" type="reset"> Reset</button> */}
                </div>
            </form>
        </div>
    );
}


