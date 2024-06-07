import React from 'react';
import './ReviewDetail.css';

import StaticStarRating from '../../components/staticStarRating';

const ReviewDetail = ({ post }) => {
    if (!post) return null;

    return (
        <div className='review-detail-container'>
            <div className='review-detail-header'>
                <img src={post.profile_pic} alt={`${post.username}'s profile`} className='profile-pic' />
                <span className='username'>{post.username}</span>
            </div>
            {post.image && post.image.trim() !== '' && <img src={post.image} alt={`${post.food_name}`} className='food-pic' />}
            <h1 className='food-name'>{post.food_name}</h1>
            <div className='star-rating'>
                <StaticStarRating rating={post.rating} />
            </div>
            {post.review && post.review.trim() !== '' && <p className='detail-text'>{post.review}</p>}
            {post.restaurant_name && post.restaurant_name.trim() !== '' && <p className='detail-text'><strong>Restaurant:</strong> {post.restaurant_name}</p>}
            {post.tags && post.tags.trim() !== '' && <p className='detail-text'><strong>Tags:</strong> {post.tags}</p>}
        </div>
    );
};

export default ReviewDetail;
