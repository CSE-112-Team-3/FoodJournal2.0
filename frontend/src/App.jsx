import { useState } from 'react'
import './App.css'
import Home from './pages/Home/index.jsx';
import { Routes, Route } from 'react-router-dom'
import Discover from './pages/Discover/index.jsx';
import Settings from './pages/Settings/index.jsx';
import SignIn from './pages/SignIn/index.jsx';
import NavBar from './components/navbar/index.jsx';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="*" element={<h1>page not found</h1>}/>
        </Routes>
    </div>
  );
}

export default App
