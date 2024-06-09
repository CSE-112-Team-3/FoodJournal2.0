import './minimizedPost.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../provider/AuthProvider.jsx';
import Cookies from 'js-cookie';

export default function MinimizedPost({ id, userId, username, profilePic, mealName, starRating, description, images, tags}) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const isMyPage = location.pathname === '/mypage';
    let currentUserId = null;
    if (user) {
        currentUserId = user.id;
    }
    const base_url = 'https://foodjournal20-production.up.railway.app';

    const handleUsernameClick = (e) => {
        // TODO: navigate to this user's page where all their posts will be displayed
        e.stopPropagation();
        const profilePicUrl = profilePic.props.imageAddress;
        navigate('/userpage', { state: { username, userId, profilePicUrl} });
    };

    const handleDeleteClick = async (e) => {
        // TODO: 
        e.stopPropagation();
        console.log('Post ID:', id);
        try {
            const accessToken = Cookies.get('accessToken');
            console.log('Access Token:', accessToken);
            const url = `${base_url}/api/v1/post_review/delete_post_review?id=${id}&access_token=${accessToken}`;
            const response = await fetch(`${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id }) 
            });

            if (response.ok) {
                console.log('Post deleted successfully');
                navigate("/mypage", { state: { username: user.username, userId: user.id, profile_picture: user.profile_picture } });
                window.location.reload();
            } 
            else {
                console.error('Failed to delete post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return(
        <div className='min-post-container' >
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
                {userId === currentUserId && isMyPage && (
                    <div className="post-actions">
                        <button className="action-button delete-button" onClick={handleDeleteClick}>Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
}