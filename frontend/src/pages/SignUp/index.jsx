import React, { useState, useEffect, useRef } from 'react';
import './SignUpPage.css';

function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [userNameValid, setUserNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

  const firstNameRef = useRef(null);

  useEffect(() => {
    firstNameRef.current.focus();

  }, []);

  const validateUserName = (userName) => {
    const userNameRegex = /^(?=.*\d)[a-zA-Z\d]{5,}$/;
    return userNameRegex.test(userName);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isUserNameValid = validateUserName(userName);
    const isEmailValid = validateEmail(email);
    setUserNameValid(isUserNameValid);
    setEmailValid(isEmailValid);

    if (password === confirmPassword && isUserNameValid && isEmailValid) {
      setPasswordMatch(true);
      // send data to the backend
      console.log('FirstName:', firstName);
      console.log('LastName:', lastName);
      console.log('UserName:', userName);
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('ConfirmPassword:', confirmPassword);
      console.log('PasswordMatch:', passwordMatch);
    } else {
      setPasswordMatch(password === confirmPassword);
      console.log('Password Match:', password === confirmPassword);
      console.log('UserName Valid:', isUserNameValid);
      console.log('Email Valid:', isEmailValid);
    }
  };

  return (
    <div className="sign-up-box">
      <h1>Food Journal</h1>
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
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            {!userNameValid && <p>Username must be at least 5 characters long and contain at least 1 number.</p>}
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {!emailValid && <p>Invalid email address</p>}
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
            {!passwordMatch && <p>Passwords do not match</p>}
            <button className="submit">Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
