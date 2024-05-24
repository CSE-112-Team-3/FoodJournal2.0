import './minimizedPost.css'

export default function MinimizedPost({ username, profilePic, mealName, starRating, description, images }) {
    return(
        <div className='min-post-container'>
            <div className='profile-section'>
                {profilePic}
                <div className='user-info'>
                    <p className='username'>@{username}</p>
                    <p className='meal-name'>just ate {mealName}</p>
                    <div className='star-rating'>{starRating}</div>
                </div>
            </div>
            <div className='content-section'>
                <img className='min-post-image' src={images[0]} alt={mealName} />
                <p className='description'>{description}</p>
            </div>
            <div className='interact-bar'>
                {/* to add like button here in the future? */}
            </div>
        </div>
    );
}