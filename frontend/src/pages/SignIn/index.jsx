import React, { useState } from 'react';
import './SignInPage.css';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const userData = {
      email: email,
      password: password
    };
  
    fetch('INSERT API NAME', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (response.ok) {
        // REDIRECT TO HOME PAGE
      } else {
        // ERROR MESSAGE
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
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
                  <a href="./SignUpPage.jsx">Sign up for free</a>
                </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignInPage;
