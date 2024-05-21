import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignInPage.css';
function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const base_url = "https://foodjournal20-production.up.railway.app";
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {  const response = await fetch(`${base_url}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'username': 'test',
        'password': 'password123',
      }).toString(),
    });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Success:', data);
        navigate('/home');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to sign in. Please check your username and password.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="sign-in-box">
      <h1>Food Journal</h1>
      <h2>Sign In</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="left-inputs">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <button className="submit" disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</button>
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