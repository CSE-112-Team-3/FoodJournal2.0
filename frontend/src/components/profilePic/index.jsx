import './profilePic.css'
import defaultProfilePic from '../../assets/blankProfile.png';

export default function ProfilePic({ username, imageAddress, size }) {
    return(
        <div className="profile-pic" style={{ width: size, height: size }}>
            <img src={imageAddress || defaultProfilePic} alt={`@${username}'s Profile Pic`}/>
        </div>
    );
}
