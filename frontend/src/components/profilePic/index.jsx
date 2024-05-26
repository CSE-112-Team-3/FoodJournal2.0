import './profilePic.css'

export default function ProfilePic({ username, imageAddress, size }) {
    return(
        <div className="profile-pic" style={{ width: size, height: size }}>
            <img src={imageAddress} alt={`@${username}'s Profile Pic`}/>
        </div>
    );
}