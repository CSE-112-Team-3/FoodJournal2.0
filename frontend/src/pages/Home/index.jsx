import './Home.css'
import NavBar from '../../components/navbar'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MinimizedPost from '../../components/minimizedPost';
import StaticStarRating from '../../components/staticStarRating';
import ProfilePic from '../../components/profilePic';
import noImage from '../../assets/noImage.png';
import CustomPopup from '../../components/popUp/index';
import ReviewDetail from '../ReviewDetail/index.jsx';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [popupVisibility, setPopupVisibility] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

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

    // const handlePostClick = (post) => {
    //   navigate(`/review/${post.id}`, { state: { post } });
    // };
    const handlePostClick = (post) => {
        setSelectedPost(post);
        setPopupVisibility(true);
    };

    const closePopupHandler = () => {
        setPopupVisibility(false);
        setSelectedPost(null);
    };
    
    return (
        
        <div className='home-container'>
            <NavBar/>
            <div className='post-container reddit-sans-condensed'>
                {posts.length > 0 ? posts.slice().reverse().map(post => (
                    <div key={post.id} onClick={() => handlePostClick(post)} className='post-link'>
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
                    </div>
                )) : <p>No posts available.</p>}
            </div>
            <CustomPopup title="Review Detail" show={popupVisibility} onClose={closePopupHandler} customClass="wide-popup">
                {selectedPost && <ReviewDetail post={selectedPost} />}
            </CustomPopup>
        </div>
    );
};

