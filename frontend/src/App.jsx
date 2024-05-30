import { useState } from 'react'
import './App.css'
import Home from './pages/Home/index.jsx';
import { Routes, Route } from 'react-router-dom'
import Discover from './pages/Discover/index.jsx';
import Settings from './pages/Settings/index.jsx';
import SignIn from './pages/SignIn/index.jsx';
import SignUp from './pages/SignUp/index.jsx';
import NavBar from './components/navbar/index.jsx';
import Profile from './pages/Profile/index.jsx';
import Review from './pages/Review/index.jsx';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/new-review" element={<Review/>}/>
          <Route path="*" element={<h1>page not found</h1>}/>

        </Routes>
    </div>
  );
}

export default App
