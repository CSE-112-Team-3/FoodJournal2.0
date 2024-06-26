import React from 'react';
import './ReviewDetail.css';
import noImage from '../../assets/noImage.png';
import defaulPicture from '../../assets/blankProfile.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../provider/AuthProvider.jsx';
import StaticStarRating from '../../components/staticStarRating';

const ReviewDetail = ({ post }) => {
    if (!post) return null;

    const navigate = useNavigate();
    const { user } = useAuth();
    

    const handleUsernameClick = (e) => {
        e.stopPropagation();
        if (post.username === user.username) {
            navigate('/mypage', { state: { username: user.username, userId: user.id, profile_picture: user.profile_picture } });
        }else{
            navigate('/userpage', { state: { username: post.username, userId: post.post_id, profile_picture: post.profile_pic} });
        }
    };

    return (
        <div className='review-detail-container'>
            <div className='review-detail-header'>
                <img src={post.profile_pic || defaulPicture } alt={`${post.username}'s profile`} className='profile-pic' />
                <span className='username' onClick={handleUsernameClick}>{post.username}</span>
            </div>
            {post.image && post.image.trim() !== '' && <img src={post.image || noImage} alt={`${post.food_name}`} className='food-pic' />}
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
