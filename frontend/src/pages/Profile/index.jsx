import React from 'react';
import UserPage from '../UserPage';
import { useAuth } from '../../provider/AuthProvider';
import './Profile.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
    const { user } = useAuth();
    const location = useLocation();
    const { username, userId, profile_picture } = location.state;
    const navigate = useNavigate();

    const initialState = {
        username: username,
        userId: userId,
        profilePic: profile_picture
    };

    const isCurrentUser = user ? user.id === initialState.userId : false;

    const handleCreateClick = () => {
        navigate('/new-review')
    };

    return (
        <div>
            <UserPage initialState={initialState} />
            {isCurrentUser && (
                <button className='create-button' onClick={handleCreateClick}>Create Post</button>
            )}
        </div>
    );
}