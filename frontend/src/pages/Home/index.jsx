import './Home.css'
import NavBar from '../../components/navbar'
import React, { useState, useEffect } from 'react';

import MinimizedPost from '../../components/minimizedPost';
import StaticStarRating from '../../components/staticStarRating';
import ProfilePic from '../../components/profilePic';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const url = 'https://foodjournal20-production.up.railway.app/api/v1/post_review/get_post_review';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setPosts(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);    

    return ( 
        <div className='home-container'>
            <NavBar/>
            <div className='post-container reddit-sans-condensed'>
                {posts.length > 0 ? posts.slice().reverse().map(post => (
                    <MinimizedPost
                        key={post.id}
                        id={post.id}
                        userId={post.post_id}
                        username={post.username}
                        profilePic={<ProfilePic username={post.username} imageAddress={post.profile_pic} size='100px' />}
                        mealName={post.food_name}
                        starRating={<StaticStarRating rating={post.rating} />}
                        description={post.review}
                        images={post.image}
                        tags={post.tags}
                    />
                )) : <p>No posts available.</p>}
            </div>
        </div>
    );
};