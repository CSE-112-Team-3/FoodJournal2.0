// Home.js
import './Home.css';
import NavBar from '../../components/navbar';
import React from 'react';
import PostList from '../../components/postList'

export default function Home() {
    const baseURL = 'https://foodjournal20-production.up.railway.app';
    const fetchUrl = `${baseURL}/api/v1/post_review/get_post_review`;

    return (
        <div className='home-container'>
            <NavBar />
            <PostList fetchUrl={fetchUrl} />
        </div>
    );
}