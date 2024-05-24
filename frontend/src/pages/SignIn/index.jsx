import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignInPage.css';
import backgroundImage from '../../assets/background.jpg';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const base_url = "https://foodjournal20-production.up.railway.app";
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = 'cover';

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
    };
  }, [])

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
      localStorage.setItem('token', data.token);
      navigate('/'); // Navigate to the home page
    } catch (error) {
      console.error('Error:', error);
      setError(`Failed to sign in: Incorrect username or password`);
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
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <a href="https://www.youtube.com/watch?v=XJFFgc9jZz0" className="forgot-password">Forgot Password?</a>
            <button className="submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
          <div className="right-text">
            <div className="sign-up-text">
              <p style={{ color: 'black' }}>New to food journal?</p>
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
