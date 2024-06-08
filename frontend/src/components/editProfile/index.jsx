import React from 'react';
import './editProfile.css';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAuth } from '../../provider/AuthProvider';
import ProfilePic from '../profilePic';

export default function EditProfile() {
    const [initialState, setInitialState] = useState({});
    const [profileImage, setProfileImage] = useState('http://ssl.gstatic.com/accounts/ui/avatar_2x.png');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setPassword] = useState('');

    const [isreadOnly, setIsReadOnly] = useState(true);
    const [verifyPassword, comfirmPassword] = useState('');
    const [invalidUsername, printUsernameErrorMessage] = useState('');
    const [invalidEmail, printEmailErrorMessage] = useState('');
    const [invalidPassword, printPasswordErrorMessage] = useState('');

    const baseUrl = 'https://foodjournal20-production.up.railway.app';
    const { user } = useAuth();

    useEffect(() => {
        const accesToken = Cookies.get('accessToken');
        if(accesToken){
            const url = `${baseUrl}/api/v1/auth/get_user?accessToken=${accesToken}`;
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    setInitialState({
                        firstName: data.first_name || '',
                        lastName: data.last_name || '',
                        userName: data.username || '',
                        email: data.email || '',
                        profileImage: data.profile_picture || 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png'
                    }, [firstName, lastName, userName, email, profileImage]);

                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setUserName(data.username);
                    setEmail(data.email);
                    setProfileImage(data.profile_picture);
                })
        }
    }, []);

    const handlePictureChange = (event)=>{
        const pic = event.target.files[0];
        if(pic){
            const reader = new FileReader();
            reader.readAsDataURL(pic);
            reader.onload = function(e) {
                setProfileImage(e.target.result);
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

    const handleSubmit = async (event)=>{
        event.preventDefault();
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
        
        setIsReadOnly(true);

        const accesToken = Cookies.get('accessToken');
        if(accesToken){
            console.log("image is");
            console.log(profileImage);
            const updateUrl = `${baseUrl}/api/v1/auth/update_user?accessToken=${accesToken}`;
            const updatedData = {};
            if (firstName !== initialState.firstName) updatedData.first_name = firstName;
            if (lastName !== initialState.lastName) updatedData.last_name = lastName;
            if (userName !== initialState.userName) updatedData.username = userName;
            if (newPassword) updatedData.password = newPassword;
            if (email !== initialState.email) updatedData.email = email;
            if (profileImage !== initialState.profileImage) updatedData.profile_picture = profileImage;

            setInitialState({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email,
                profileImage: profileImage
            });
            console.log(initialState);
            console.log(updatedData);

            try {
                const response = await fetch(updateUrl, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData)
                });
                const data = await response.json();

                if (data.detail) {
                    alert(`User could not be updated. ${data.detail}. Please try again.`);
                    setFirstName(initialState.firstName);
                    setLastName(initialState.lastName);
                    setUserName(initialState.userName);
                    setEmail(initialState.email);
                    setProfileImage(initialState.profileImage);
                    setIsReadOnly(true);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        const form = document.getElementById('registrationForm');
        form.reset();
    }

    return (
        <div className="profilePage">
            <div className="text-center">
                <ProfilePic 
                    username={user?.username} 
                    imageAddress={profileImage} 
                    size='200px'
                />
                <h6>Upload Your Profile Picture</h6>
                <input 
                    type="file" 
                    className={isreadOnly ? "file-upload reddit-sans-condensed circle-btn-disabled" : "file-upload reddit-sans-condensed circle-btn"}
                    onChange={handlePictureChange} 
                    accept="image/png, image/jpeg"
                    disabled={isreadOnly}
                />
            </div>

            <form className="form" id="registrationForm" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="first_name"><h4>First name: {firstName}</h4></label>
                    <input 
                        onChange={handleFirstNameChange} 
                        type="text" 
                        className="form-control" 
                        name="first_name" 
                        id="first_name" 
                        placeholder="first name" 
                        readOnly={isreadOnly}
                    />
                    <p>{''}</p>
                </div>
                <div>
                    <label htmlFor="last_name"><h4>Last name: {lastName}</h4></label>
                    <input 
                        onChange={handleLastNameChange} 
                        type="text" 
                        className="form-control" 
                        name="last_name" 
                        id="last_name" 
                        placeholder="last name" 
                        readOnly={isreadOnly}
                    />
                    <p>{''}</p>
                </div>
                <div>
                    <label htmlFor="username"><h4>Username: {userName}</h4></label>
                    <input 
                        onChange={handleUsernameChange} 
                        type="text" 
                        className="form-control" 
                        name="username" 
                        id="phone" 
                        placeholder="your username"
                        maxLength={20}
                        minLength={3} 
                        readOnly={isreadOnly}
                    />
                    {/* <p>{invalidUsername}</p> */}
                </div>

                <div>
                    <label htmlFor="email"><h4>Email: {email}</h4></label>
                    <input 
                        onChange={handleEmailChange} 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        id="email" 
                        placeholder="you@email.com" 
                        readOnly={isreadOnly}
                    />
                    <p>{invalidEmail}</p>
                </div>

                <div>
                    <label htmlFor="password"><h4>New Password</h4></label>
                    <input 
                        onChange={handlePasswordChange} 
                        type="password" 
                        className="form-control" 
                        name="password" 
                        id="password" 
                        placeholder="password" 
                        readOnly={isreadOnly}
                    />
                    <p>{''}</p>
                </div>
                <div>
                    <label htmlFor="password2"><h4>Verify</h4></label>
                    <input 
                        onChange={VerifyNewPassword} 
                        type="password" 
                        className="form-control" 
                        name="password2" 
                        id="password2" 
                        placeholder="verify password" 
                        readOnly={isreadOnly}
                    />
                    <p>{invalidPassword}</p>
                </div>
                <div>
                    <br/>
                    <button className="submitButton" onClick={isreadOnly? handleEditButton:handleSubmit}> {isreadOnly? 'Edit':'Save'}</button>
                </div>
            </form>
        </div>
    );
}

