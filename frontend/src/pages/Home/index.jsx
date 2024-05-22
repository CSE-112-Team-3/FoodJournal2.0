import './Home.css'
import NavBar from '../../components/navbar'
import MinimizedPost from '../../components/minimizedPost';
import StaticStarRating from '../../components/staticStarRating';

export default function Home() {
    return(
        <div className='home-container'>
            <NavBar/>
            <div className='post-container'>
                <MinimizedPost
                    username='cctrunk'
                    profilePic='../../public/images/default-pfp.png'
                    mealName='Chicken Adobo'
                    starRating={<StaticStarRating rating={4}/>}
                    description='delicious chicken adobo!!'
                    images={['https://images.themodernproper.com/billowy-turkey/production/posts/2022/Chicken-Adobo-8.jpeg?w=960&h=960&q=82&fm=jpg&fit=crop&dm=1646167946&s=7383f89ead4392abf3333491440912dd']}
                />
            </div>
        </div>
    );
}