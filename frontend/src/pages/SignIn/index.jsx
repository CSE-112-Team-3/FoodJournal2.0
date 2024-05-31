import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignInPage.css';
import backgroundImage from '../../assets/background.jpg';
import Cookies from  'js-cookie';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const base_url = "https://foodjournal20-production.up.railway.app";
  const navigate = useNavigate();
  const usernameInputRef = useRef(null);

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
      const response = await fetch(`${base_url}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: username,
          password: password
        }).toString(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log('Success:', data);

      //SUCCESSFUL LOGIN YIPPEEEE
      // localStorage.setItem('token', data.access_token);
      Cookies.set('accessToken', data.access_token, { expires: 1, secure: true, sameSite: 'Strict' });
      navigate('/'); 
    } catch (error) {
      console.error('Error:', error);
      setError(`Failed to sign in: ${error.message}`);
    } finally {
      setLoading(false);
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
