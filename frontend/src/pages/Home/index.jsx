import './Home.css'
import NavBar from '../../components/navbar'

import MinimizedPost from '../../components/minimizedPost';
import StaticStarRating from '../../components/staticStarRating';
import ProfilePic from '../../components/profilePic';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'


export default function Home() {
    const posts = [
        {
          username: 'cctrunk',
          profilePic: 'https://ychef.files.bbci.co.uk/624x351/p024vl48.png',
          mealName: 'Chicken Adobo',
          starRating: 4,
          description: 'delicious chicken adobo!!',
          images: ['https://images.themodernproper.com/billowy-turkey/production/posts/2022/Chicken-Adobo-8.jpeg?w=960&h=960&q=82&fm=jpg&fit=crop&dm=1646167946&s=7383f89ead4392abf3333491440912dd']
        },
        {
          username: 'cctrunk',
          profilePic: 'https://ychef.files.bbci.co.uk/624x351/p024vl48.png',
          mealName: 'Chè Ba Màu',
          starRating: 5,
          description: 'wow this is so delicious and refreshing and awesome and spectacular',
          images: ['https://takestwoeggs.com/wp-content/uploads/2021/09/Che%CC%80-Ba-Ma%CC%80u-Vietnamese-three-colored-dessert-Takestwoeggs-Final-SQ-500x500.jpg']
        },
        {
            username: 'sjoifewhfwio',
            profilePic: '../../public/images/default-pfp.png',
            mealName: 'Hot Pocket',
            starRating: 1,
            description: 'rawwwwwwwwwwrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
            images: ['https://i.redd.it/yplxndi8izdb1.jpg']
        }
      ];


    return(
        <div className='home-container'>
            <NavBar/>
            <div className='post-container reddit-sans-condensed'>
                {posts ? posts.map((post, index) => (
                <MinimizedPost
                    key={index}
                    username={post.username}
                    profilePic={<ProfilePic username={post.username} imageAddress={post.profilePic} size='100px' />}
                    mealName={post.mealName}
                    starRating={<StaticStarRating rating={post.starRating} />}
                    description={post.description}
                    images={post.images}
                />
                )) : null}
            </div>

        <div className="container">
            <NavBar/>
            <Link to="/new-review">
              <button className="circle-btn">+</button>
            </Link>

        </div>
        
    );
}