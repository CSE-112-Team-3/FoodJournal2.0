import './Home.css'
import NavBar from '../../components/navbar'
import React, { useState, useEffect } from 'react';

import MinimizedPost from '../../components/minimizedPost';
import StaticStarRating from '../../components/staticStarRating';
import ProfilePic from '../../components/profilePic';
import { Link } from 'react-router-dom'

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

// import './Home.css'
// import NavBar from '../../components/navbar'
// import { useState } from 'react';

// import MinimizedPost from '../../components/minimizedPost';
// import StaticStarRating from '../../components/staticStarRating';
// import ProfilePic from '../../components/profilePic';
// import { Link } from 'react-router-dom'


// export default function Home() {
//     const [pictureNavbar, setPictureNavbar] = useState('http://ssl.gstatic.com/accounts/ui/avatar_2x.png');
//     //TODO: Retrieve the image link from the database to replace the link in 'useState'.
//     const posts = [
//         {
//           username: 'cctrunk',
//           profilePic: 'https://ychef.files.bbci.co.uk/624x351/p024vl48.png',
//           mealName: 'Chicken Adobo',
//           starRating: 4,
//           description: 'delicious chicken adobo!!',
//           images: ['https://images.themodernproper.com/billowy-turkey/production/posts/2022/Chicken-Adobo-8.jpeg?w=960&h=960&q=82&fm=jpg&fit=crop&dm=1646167946&s=7383f89ead4392abf3333491440912dd']
//         },
//         {
//           username: 'cctrunk',
//           profilePic: 'https://ychef.files.bbci.co.uk/624x351/p024vl48.png',
//           mealName: 'Chè Ba Màu',
//           starRating: 5,
//           description: 'wow this is so delicious and refreshing and awesome and spectacular',
//           images: ['https://takestwoeggs.com/wp-content/uploads/2021/09/Che%CC%80-Ba-Ma%CC%80u-Vietnamese-three-colored-dessert-Takestwoeggs-Final-SQ-500x500.jpg']
//         },
//         {
//             username: 'sjoifewhfwio',
//             profilePic: '../../public/images/default-pfp.png',
//             mealName: 'Hot Pocket',
//             starRating: 1,
//             description: 'rawwwwwwwwwwrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
//             images: ['https://i.redd.it/yplxndi8izdb1.jpg']
//         }
//       ];


//     return(
//         <div className='home-container'>
//             <NavBar pictureNavbar={pictureNavbar} />
//             <div className='post-container reddit-sans-condensed'>
//                 {posts ? posts.map((post, index) => (
//                 <MinimizedPost
//                     key={index}
//                     username={post.username}
//                     profilePic={<ProfilePic username={post.username} imageAddress={post.profilePic} size='100px' />}
//                     mealName={post.mealName}
//                     starRating={<StaticStarRating rating={post.starRating} />}
//                     description={post.description}
//                     images={post.images}
//                 />
//                 )) : null}
//             </div>
//         </div>
//     );
// }
