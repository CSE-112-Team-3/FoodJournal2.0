import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './SignInPage.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // send stuff to backend
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="sign-in-box">
      <h1>Food Journal</h1>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="left-inputs">
            <input
              type="email"
              placeholder="Email or username" 
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
            <a href="https://www.youtube.com/watch?v=XJFFgc9jZz0" className="forgot-password">Forgot Password?</a>
            <button className="submit">Sign In</button>
          </div>
          <div className="right-text">
            <div className="sign-up-text">
              <p>New to food journal?</p>
                <div className="sign-up-link">
                  <Link to='/signup'>Sign up for free</Link>
                </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;