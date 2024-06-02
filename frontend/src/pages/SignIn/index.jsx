import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './SignInPage.css';
import backgroundImage from '../../assets/background.jpg';
import { useAuth } from '../../provider/AuthProvider.jsx';


function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const usernameInputRef = useRef(null);
  const { signin } = useAuth();

  useEffect(() => {
    usernameInputRef.current.focus();
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = 'cover';

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signin(username, password, {setError, setLoading}); 
    } catch(error) {
      console.log('sign in failed: ', error);
    }
  };

  return (
    <div className="sign-in-box reddit-sans-condensed">
      <h1>Food Journal</h1>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="left-inputs">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              ref={usernameInputRef}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <div className="error-message">{error}</div>}
            <button className="submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            <a href = "https://youtu.be/b3rNUhDqciM" className = "forgot">Forgot Password?</a>
          </div>
          <div className="right-text">
            <div className="sign-up-text">
              <p>New to Food Journal?</p>
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
