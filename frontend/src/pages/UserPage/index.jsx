// UserPage.js
import '../Home/Home.css';
import './UserPage.css';
import NavBar from '../../components/navbar';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import PostList from '../../components/postList'

export default function UserPage({ initialState }) {
    const location = useLocation();
    const { username, userId, profilePic } = location.state || initialState || {};
    const currentUserId = Cookies.get('userId');
    const baseUrl = 'https://foodjournal20-production.up.railway.app';
    const fetchUrl = userId ? `${baseUrl}/api/v1/post_review/get_posts_by_id?post_id=${userId}` : null;

    return (
        <div className='home-container'>
            <NavBar />
            <PostList 
                fetchUrl={fetchUrl} 
                isUserPage={true}
                username={username}
                profilePic={profilePic}
                userId={userId === currentUserId ? userId : null}
            />
        </div>
    );
}
