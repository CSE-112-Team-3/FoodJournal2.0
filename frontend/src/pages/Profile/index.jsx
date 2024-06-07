import React from 'react';
import UserPage from '../UserPage';
import { useAuth } from '../../provider/AuthProvider';
import './Profile.css';

export default function MyPage() {
    const { user } = useAuth();

    const initialState = {
        username: user.username,
        userId: user.userId,
        profilePic: user.profile_picture
    };

    const isCurrentUser = user.userId === initialState.userId;
    console.log(isCurrentUser);

    return (
        <div>
            <UserPage initialState={initialState} />
            {isCurrentUser && (
                <button className='create-button'>Create Post</button>
            )}
        </div>
    );
}




// import React from 'react';
// import Cookies from 'js-cookie';
// import NavBar from '../../components/navbar'
// import minimizedPost from '../../components/minimizedPost';
// import "bootstrap/dist/css/bootstrap.min.css";
// import React, { useState, useEffect } from 'react';
// import MinimizedPost from '../../components/minimizedPost';

// export default function Profile() {
//     const [pictureNavbar, setPictureNavbar] = useState('http://ssl.gstatic.com/accounts/ui/avatar_2x.png')
//     const [userId, setUserId] = useState(0);
//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         const accessToken = Cookies.get('accessToken');

//         if (accessToken) {
//             const url = `https://foodjournal20-production.up.railway.app/api/v1/auth/get_user?accessToken=${accessToken}`;
//             fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             .then(response => response.json())
//             .then(data => {
//                 setUserId(data.id)
//             })
//         }

//         if (user.id != 0) {
//             const url = `https://foodjournal20-production.up.railway.app/api/v1/post_review/get_posts_by_id?post_id=${userId}`;
//             fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             .then(response => response.json())
//             .then(data => {
//                 setPosts(data)
//             })
//         }
        
//     }, [userId, posts]);

//     //const { user } = useAuth();

//     //const listItems = posts.map((post) =>);

//     return(
//         <div className="Profile">

//         </div>
//     );
// }