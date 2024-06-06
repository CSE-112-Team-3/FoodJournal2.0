import React from 'react';
import { useLocation } from 'react-router-dom';
import './ReviewDetail.css';

import StaticStarRating from '../../components/staticStarRating';
import ProfilePic from '../../components/profilePic';

const ReviewDetail = () => {
    const location = useLocation();
    const { post } = location.state;

    return (
        <div className='review-detail-container'>
            <h1>{post.food_name}</h1>
            <div className='review-detail'>
                <img src={post.profile_pic} alt={`${post.username}'s profile`} className='profile-pic'/>
                <h2>{post.username}</h2>
                <div className='star-rating'>
                    <StaticStarRating rating={post.rating} />
                </div>
                <p>{post.review}</p>
                {post.image && <img src={post.image} alt={`${post.food_name}`} className='food-pic' />}
                <p><strong>Restaurant:</strong> {post.restaurant_name}</p>
            </div>
        </div>
    );
};

export default ReviewDetail;