import './Post.css'
export default function MinimizedPost({ username, profilePic, mealName, starRating, description, images }) {
    return(
        <div className='min-post-container'>
            <img src={profilePic}/>
            <p>@{username} just ate {mealName}</p>
            {starRating}
            <img className='min-post-image' src={images[0]} width='300px' height='300px'/>
            <p>{description}</p>
        </div>
    );
}