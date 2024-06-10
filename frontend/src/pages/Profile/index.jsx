import React, { useEffect } from 'react';
import UserPage from '../UserPage';
import { useAuth } from '../../provider/AuthProvider';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
    const { user, accessToken, getUser } = useAuth();
    const navigate = useNavigate();
    console.log('user: ', accessToken);

    useEffect(() => {
        if (accessToken && !user) {
            getUser(accessToken);
        }
    }, [accessToken, user, getUser]);

    if (!user) {
        return <div>Loading...</div>;
    }

    const initialState = {
        username: user.username,
        userId: user.userId,
        profilePic: user.profile_picture
    };

    const isCurrentUser = user.id === initialState.userId;

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