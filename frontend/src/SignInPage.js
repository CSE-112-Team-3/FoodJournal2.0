import React, { useState } from 'react';


function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Form Submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // send stuff to backend
    console.log('Email:', email);
    console.log('Password:', password);

  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInPage;
