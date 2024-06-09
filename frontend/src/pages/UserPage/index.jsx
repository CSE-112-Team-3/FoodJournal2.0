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


// import '../Home/Home.css';
// import './UserPage.css';
// import NavBar from '../../components/navbar';
// import React, { useState, useEffect } from 'react';

// import MinimizedPost from '../../components/minimizedPost';
// import StaticStarRating from '../../components/staticStarRating';
// import ProfilePic from '../../components/profilePic';
// import { useLocation } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import Home from '../Home';


// export default function UserPage({ initialState }) {
//     // const [posts, setPosts] = useState([]);
//     const Url = `https://foodjournal20-production.up.railway.app//api/v1/post_review/get_posts_by_id?post_id=${userId}`;
//     const location = useLocation();
//     const { username, userId, profilePic } = location.state || initialState || {};
//     const currentUserId = Cookies.get('userId');

//     return (
//         <>
//         <div id='profile-section'>
//             <ProfilePic username={username} imageAddress={profilePic} size='200px' />
//             <h1 id={'username'}>{username ? `${username}'s Posts` : 'User Posts'}</h1>
//             {userId === currentUserId && (
//                 <div className="user-actions">
//                     <button>Create Post</button>
//                 </div>
//             )}
//         </div>
//         <Home URL={Url} currUserId={currentUserId} />
//         </>
//     )

    // useEffect(() => {
    //     if (!userId) return;
    //
    //     const url = `${baseUrl}/api/v1/post_review/get_posts_by_id?post_id=${userId}`;
    //     const fetchedPosts = async () => {
    //         try {
    //             const response = await fetch(url, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             });
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setPosts(data);
    //                 console.log(posts)
    //             } else {
    //                 setPosts([]);
    //                 throw new Error('Failed to fetch posts');
    //             }
    //         }catch(error) {
    //             setPosts([]);
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //     setPosts([]);
    //     fetchedPosts();
    // }, [userId]);
    //
    // return (
    //     <div className='home-container'>
    //         <NavBar />         
            // <div className='post-container reddit-sans-condensed'>
            //     <div id='profile-section'>   
            //         <ProfilePic username={username} imageAddress={profilePic} size='200px' />
            //         <h1 id={'username'}>{username ? `${username}'s Posts` : 'User Posts'}</h1>
            //         {userId === currentUserId && (
            //             <div className="user-actions">
            //                 <button>Create Post</button>
            //             </div>
            //         )}
            //     </div>   
    //             {posts.length > 0 ? posts.slice().reverse().map(post => (
    //                 <MinimizedPost
    //                     key={post.id}
    //                     id={post.id}
    //                     userId={post.post_id}
    //                     username={username}
    //                     profilePic={<ProfilePic username={username} imageAddress={profilePic} size='100px' />}
    //                     mealName={post.food_name}
    //                     starRating={<StaticStarRating rating={post.rating} />}
    //                     description={post.review}
    //                     images={post.image}
    //                     tags={post.tags}
    //                 />
    //             )) : <p>No posts available.</p>}
    //         </div>
    //     </div>
    // );
// }
