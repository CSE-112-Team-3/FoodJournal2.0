import React, { useState, useEffect, useRef } from 'react';
import './SignUpPage.css';
import CustomPopup from '../../components/popUp/index';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/background.jpg';
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../provider/AuthProvider';


function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userNameValid, setUserNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const firstNameRef = useRef(null);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = 'cover';

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
    };
  }, [])

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  const validateUserName = (userName) => {
    return userName.length >= 3 && userName.length <= 20;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    setUserNameValid(validateUserName(e.target.value));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValid(validateEmail(e.target.value));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const isUserNameValid = validateUserName(userName);
    const isEmailValid = validateEmail(email);
    const isPasswordMatch = password === confirmPassword;

    setUserNameValid(isUserNameValid);
    setEmailValid(isEmailValid);
    setPasswordMatch(isPasswordMatch);
    setUserNameErrorMessage('');
    setEmailErrorMessage('');

    if (isUserNameValid && isEmailValid && isPasswordMatch) {
      const userData = {
        first_name: firstName,
        last_name: lastName,
        username: userName,
        password: password,
        email: email
      };

        try {
          await signup(userData, {setPopupVisibility, setShowSuccessMessage});
        } catch(error) {
          console.log('sign up failed: ', error);
        }
      }
    };

  const popupCloseHandler = () => {
    setPopupVisibility(false);
    setShowSuccessMessage(false);
    navigate('/signin');
  };

  return (
    <div className='sign-up-container reddit-sans-condensed'>
      <div className="sign-up-box">
        <h1>Food Journal</h1>
        <p>Already have an account? Click <Link to='/signin'> here </Link> to login!</p>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="left-inputs">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                ref={firstNameRef}
                required
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <label htmlFor="userName">Username</label>
              <input
                id="userName"
                type="text"
                value={userName}
                onChange={handleUserNameChange}
                required
              />

              {!userNameValid && <p>Username must be between 3 to 20 characters long.</p>}

              {userNameErrorMessage && <p className="error-message">{userNameErrorMessage}</p>}
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {!emailValid && <p className='error-message'>Invalid email address</p>}
              {emailErrorMessage && <p className="error-message">{emailErrorMessage}</p>}
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {!passwordMatch && <p className='error-message'>Passwords do not match</p>}
              <button className="submit" type="submit">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
      {showSuccessMessage && (
        <CustomPopup
          onClose={popupCloseHandler}
          show={popupVisibility}
        >
          <h1>Welcome to Food Journal!</h1>
          <h2>Your account was created successfully, redirecting you to the Sign In page...</h2>
        </CustomPopup>
      )}
    </div>
  );
}

export default SignUpPage;
