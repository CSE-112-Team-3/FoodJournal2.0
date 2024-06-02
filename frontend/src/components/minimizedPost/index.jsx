import React from 'react';
import { useNavigate } from 'react-router-dom';
import './minimizedPost.css';

export default function MinimizedPost({ username, profilePic, mealName, starRating, description, images }) {
    const navigate = useNavigate();

    const handleUpdateClick = () => {
        const imageUrls = images.map(image => image.src || image);
        const state = { username, mealName, starRating, description, images: imageUrls };
        navigate('/review', { state });
    };

    return (
        <div className='min-post-container'>
            <div className='profile-section'>
                {profilePic}
                <div className='user-info'>
                    <p className='username'>@{username}</p>
                    <p className='meal-name'>just ate {mealName}</p>
                    <div className='star-rating'>{'★'.repeat(starRating)}</div>
                </div>
            </div>
            <div className='content-section'>
                {images && images[0] && <img className='min-post-image' src={images[0].src || images[0]} alt={mealName} />}
                <p className='description'>{description}</p>
            </div>
            <div className='postActionButtons'>
                <button className='update-button' onClick={handleUpdateClick}>Update Post</button>
                <button className='delete-button'>Delete Post</button>
            </div>
        </div>
    );
}
