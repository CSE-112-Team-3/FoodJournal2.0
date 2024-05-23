import './staticStarRating.css'
export default function StaticStarRating({ rating }) {
    const totalStars = 5;
    return(
        <div className="star-rating">
            {Array.from({ length: totalStars }, (v, i) => (
            <span className={i < rating ? 'star filled' : 'star'}>&#9733;</span>
            ))}
      </div>
    );
}