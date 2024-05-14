import React, { useState } from 'react';
import './SignUpPage.css';

function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    // send stuff to backend
    console.log('FirstName:', firstName);
    console.log('LastName:', lastName);
    console.log('UserName:', userName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('ConfirmPassword:', confirmPassword);
    console.log('PasswordMatch', passwordMatch);

    if (password === confirmPassword) {
        console.log('Password Match');
        setPasswordMatch(true);
      } else {
        console.log('Password Not Match');
        setPasswordMatch(false);
      }
  };

  return (
    <div className="sign-up-box">
      <h1>Food Journal</h1>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="left-inputs">
          <input
              type="firstName"
              placeholder="First Name" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="lastName"
              placeholder="Last Name" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="userName"
              placeholder="Username" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <button className="submit">Sign Up</button>
          </div>
          <div className="right-inputs">
          <input
              type="email"
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {!passwordMatch && <p>Passwords do not match</p>}
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
