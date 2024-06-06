import './minimizedPost.css'

export default function MinimizedPost({ id, userId, username, profilePic, mealName, starRating, description, images }) {
    const handlePostClick = () => {
        // TODO: Expand this post to display all the details
        console.log({
            id,
            userId,
            username,
            mealName,
            starRating,
            description,
            images
        });
    };

    const handleUsernameClick = (e) => {
        // TODO: navigate to this user's page where all their posts will be displayed
        console.log("user id: ", userId);
        console.log("username: ", username);
        e.stopPropagation();
    };
    
    return(
        <div className='min-post-container' onClick={handlePostClick}>
            <div className='profile-section'>
                {profilePic}
                <div className='user-info'>
                    <p className='username' onClick={handleUsernameClick}>@{username}</p>
                    <p className='meal-name'>just ate {mealName}</p>
                    <div className='star-rating'>{starRating}</div>
                </div>
            </div>
            <div className='content-section'>
                <img className='min-post-image' src={images} alt={mealName} />
                <p className='description'>{description}</p>
            </div>
            <div className='interact-bar'>
                {/* to add like button here in the future? */}
            </div>
        </div>
    );
}