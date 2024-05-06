// App.js
import React from 'react';
import SignInPage from './SignInPage.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-container" style={{ backgroundImage: "url('../images/backgroundImage.jpeg')" }}>
        <SignInPage />
      </div>
    </div>
  );
}

export default App;
