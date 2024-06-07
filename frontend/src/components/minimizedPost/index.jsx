import './minimizedPost.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../provider/AuthProvider.jsx';

export default function MinimizedPost({ id, userId, username, profilePic, mealName, starRating, description, images, tags }) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const currentUserId = user.userId;
    const handlePostClick = () => {
        // TODO: Expand this post to display all the details
        console.log({
            id,
            userId,
            username,
            mealName,
            starRating,
            description,
            images,
            tags
        });
    };

    const handleUsernameClick = (e) => {
        // TODO: navigate to this user's page where all their posts will be displayed
        const profilePicUrl = profilePic.props.imageAddress;
        setRefreshKey(prevKey => prevKey + 1);
        navigate('/userpage', { state: { username, userId, profilePicUrl} });

        e.stopPropagation();
    };

    const handleUpdateClick = (e) => {
        // TODO: 
        e.stopPropagation();
    };

    const handleDeleteClick = (e) => {
        // TODO: 
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
                {userId === currentUserId && (
                    <div className="post-actions">
                        <button className="action-button update-button" onClick={handleUpdateClick}>Update</button>
                        <button className="action-button delete-button" onClick={handleDeleteClick}>Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
}