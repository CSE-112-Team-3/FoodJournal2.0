// PostList.js
import React, { useState, useEffect } from 'react';
import MinimizedPost from '../minimizedPost';
import StaticStarRating from '../staticStarRating';
import ProfilePic from '../profilePic';
import noImage from '../../assets/noImage.png';
import CustomPopup from '../popUp/index';
import ReviewDetail from '../../pages/ReviewDetail/index.jsx';

export default function PostList({ fetchUrl, isUserPage, username, profilePic, userId }) {
    const [posts, setPosts] = useState([]);
    const [popupVisibility, setPopupVisibility] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        if (!fetchUrl) return;

        fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(error => console.error('Error fetching data:', error));
    }, [fetchUrl]);

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setPopupVisibility(true);
    };

    const closePopupHandler = () => {
        setPopupVisibility(false);
        setSelectedPost(null);
    };

    return (
        <div className='post-container reddit-sans-condensed'>
            {isUserPage && (
                <div id='profile-section'>
                    <ProfilePic username={username} imageAddress={profilePic} size='200px' />
                    <h1 id={'username'}>{username ? `${username}'s Posts` : 'User Posts'}</h1>
                    {userId && (
                        <div className="user-actions">
                            <button>Create Post</button>
                        </div>
                    )}
                </div>
            )}
            {posts.length > 0 ? posts.slice().reverse().map(post => (
                <div key={post.id} onClick={() => handlePostClick(post)} className='post-link'>
                    <MinimizedPost
                        id={post.id}
                        userId={post.post_id}
                        username={isUserPage ? username : post.username}
                        profilePic={<ProfilePic username={isUserPage ? username : post.username} imageAddress={isUserPage ? profilePic : post.profile_pic} size='100px' />}
                        mealName={post.food_name}
                        starRating={<StaticStarRating rating={post.rating} />}
                        description={post.review}
                        images={post.image || noImage}
                        tags={post.tags}
                    />
                </div>
            )) : <p>No posts available.</p>}
            <CustomPopup title="Review Detail" show={popupVisibility} onClose={closePopupHandler} customClass="wide-popup">
                {selectedPost && <ReviewDetail post={selectedPost} />}
            </CustomPopup>
        </div>
    );
}
