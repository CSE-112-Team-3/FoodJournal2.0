import React from 'react';
import './profile.css';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function ProfilePage({ setPictureNavbar }) {
    const [profileImage, setProfileImage] = useState('http://ssl.gstatic.com/accounts/ui/avatar_2x.png'); //TODO: need to get the image from database
    const [firstName, setFirstName] = useState('Dylan'); //TODO: need to get the first name from the database.
    const [lastName, setLastName] = useState('Zhang'); //TODO: need to get the last name from the database.
    const [userName, setUserName] = useState('yuz'); //TODO: need to get the username from the database.
    const [email, setEmail] = useState('123@mail.com'); //TODO: need to get the email from the database.
    const [newPassword, setPassword] = useState('');

    const [isreadOnly, setIsReadOnly] = useState(true);
    const [verifyPassword, comfirmPassword] = useState('');
    const [invalidUsername, printUsernameErrorMessage] = useState('');
    const [invalidEmail, printEmailErrorMessage] = useState('');
    const [invalidPassword, printPasswordErrorMessage] = useState('');
    const [profileImage_copy, setImage] = useState('http://ssl.gstatic.com/accounts/ui/avatar_2x.png');

    useEffect(() => {
        const accesToken = Cookies.get('accessToken');
        if(accesToken){
            const url = `https://foodjournal20-production.up.railway.app/api/v1/auth/get_user?accessToken=${accesToken}`;
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setUserName(data.username);
                    setEmail(data.email);
                    setProfileImage(data.profile_picture);
                })
        }
    }, []);

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
    const handleEmailChange = (event)=>{
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event)=>{
        setPassword(event.target.value);
    }
    const VerifyNewPassword = (event)=>{
        comfirmPassword(event.target.value);
    }
    const handleEditButton = (event)=>{
        event.preventDefault();
        setIsReadOnly(false);
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
        setIsReadOnly(true);
        printPasswordErrorMessage('');
        printEmailErrorMessage('');
        printUsernameErrorMessage('');

        if(newPassword !== verifyPassword){
            printPasswordErrorMessage('Passwords do not match');
            return;
        }

        if(!isValidEmail(email)){
            console.log(email);
            printEmailErrorMessage('Invalid email address');
            return;
        }

        if(!isValidUsername(userName)){
            console.log(userName);
            printUsernameErrorMessage('Username must be at least 5 characters long and contain at least 1 number');
            return;
        }
        setProfileImage(profileImage_copy);

        //TODO: submit the form, and store all the information in the database
        const accesToken = Cookies.get('accessToken');
        if(accesToken){
            const updateUrl = `https://foodjournal20-production.up.railway.app/api/v1/auth/update_user?accessToken=${accesToken}`;
            const updatedData = {
                first_name: firstName,
                last_name: lastName,
                username: userName,
                password: newPassword,
                email: email,
                profile_picture: profileImage
            };
        
            fetch(updateUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${accesToken}`
                },
                body: JSON.stringify(updatedData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }

    return (
        <div className="main">
            <div className = "padding-left"></div>
            <div className = "profilePage">
                <div className="text-center">
                    <img src={profileImage_copy} className="profile_image" alt="avatar" />
                    <h6>Upload Your Profile Picture</h6>
                    <input type="file" className="file-upload" onChange={handlePictureChange}/>
                </div>
                <form className="form" id="registrationForm">
                    <div>
                        <label htmlFor="first_name"><h4>First name : {firstName}</h4></label>
                        <input onChange={handleFirstNameChange} type="text" className="form-control" name="first_name" id="first_name" readOnly={isreadOnly}/>
                        <p>{''}</p>
                    </div>
                    <div>
                        <label htmlFor="last_name"><h4>Last name : {lastName}</h4></label>
                        <input onChange={handleLastNameChange} type="text" className="form-control" name="last_name" id="last_name" readOnly={isreadOnly}/>
                        <p>{''}</p>
                    </div>
                    <div>
                        <label htmlFor="username"><h4>Username : {userName}</h4></label>
                        <input onChange={handleUsernameChange} type="text" className="form-control" name="username" id="phone" readOnly={isreadOnly}/>
                        <p>{invalidUsername}</p>
                    </div>

                    <div>
                        <label htmlFor="email"><h4>Email : {email}</h4></label>
                        <input onChange={handleEmailChange} type="email" className="form-control" name="email" id="email" readOnly={isreadOnly}/>
                        <p>{invalidEmail}</p>
                    </div>

                    <div>
                        <label htmlFor="password"><h4>New Password</h4></label>
                        <input onChange={handlePasswordChange} type="password" className="form-control" name="password" id="password" placeholder="password" readOnly={isreadOnly}/>
                        <p>{''}</p>
                    </div>
                    <div>
                        <label htmlFor="password2"><h4>Verify</h4></label>
                        <input onChange={VerifyNewPassword} type="password" className="form-control" name="password2" id="password2" placeholder="verify password" readOnly={isreadOnly}/>
                        <p>{invalidPassword}</p>
                    </div>
                    <div>
                        <br/>
                        <button className="submitButton" onClick={isreadOnly? handleEditButton:handleSubmit}> {isreadOnly? 'Edit':'Save'}</button>
                        {/* <button className="resetButton" type="reset"> Reset</button> */}
                    </div>
                </form>
            </div>
        </div>
    );
}

