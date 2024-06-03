import { useState } from 'react'
import './App.css'
import Home from './pages/Home/index.jsx';
import { Routes, Route } from 'react-router-dom'
import Discover from './pages/Discover/index.jsx';
import Settings from './pages/Settings/index.jsx';
import SignIn from './pages/SignIn/index.jsx';
import SignUp from './pages/SignUp/index.jsx';
import Profile from './pages/Profile/index.jsx';
import Review from './pages/Review/index.jsx';
import PrivateRoute from './components/privateRoute/index.jsx';
import Error403 from './pages/Error/Error403.jsx';
import Error404 from './pages/Error/Error404.jsx';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/new-review" element={<Review />} />
          </Route>
          <Route path="/error-403" element={<Error403/>}/>
          <Route path="*" element={<Error404/>}/>

        </Routes>
    </div>
  );
}

export default App
