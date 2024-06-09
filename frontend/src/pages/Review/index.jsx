import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewReviewPage.css';
import Cookies from 'js-cookie';
import backgroundImage from '../../assets/background.jpg';

function ReviewPage() {
    const [mealName, setMealName] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [mealPics, setMealPics] = useState(null);
    const [picsMode, setPicsMode] = useState('upload');
    const [stars, setStars] = useState(0);
    const [showError, setShowError] = useState(false);
    const [comments, setComments] = useState('');
    const [tag, setTag] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);

    const videoRef = useRef(null);
    const mediaStreamRef = useRef(null);
    const canvasRef = useRef(null);

    const mealNameRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundImage = `url(${backgroundImage})`;
        document.body.style.backgroundSize = 'cover';
    
        return () => {
          document.body.style.backgroundImage = '';
          document.body.style.backgroundSize = '';
        };
      }, [])
      
    useEffect(() => {
        mealNameRef.current.focus();
    }, []);

    const handleCancel = () => {
        navigate('/');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (stars === 0) {
            setShowError(true);
            return;
        }

        if (picsMode === 'camera') {
            stopCamera();
        }

        let imageBase64 = null;
        if (mealPics) {
            try {
                imageBase64 = await convertToBase64(mealPics);
            } catch (error) {
                console.error('Error converting image to base64:', error);
                return;
            }
        }

        const token = Cookies.get('accessToken');

        const reviewData = {
            food_name: mealName,
            image: imageBase64,
            restaurant_name: restaurant,
            rating: parseInt(stars, 10),
            review: comments,
            tags: tag
        };

        const url = `https://foodjournal20-production.up.railway.app/api/v1/post_review/create_post_review?access_token=${token}`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });
            if (response.ok) {
                navigate('/');
            } else {
                const errorData = await response.json();
                console.error('Error creating new entry:', response.status, errorData);
                setErrorMessages(errorData.detail || ['Unknown error occurred.']);
            }
        } catch (error) {
            console.error('Error creating new entry:', error);
            setErrorMessages(['Network error occurred.']);
        }
    };

    const convertToBase64 = (file) => {
        if (!(file instanceof Blob || file instanceof File)) {
            return '';
        } else {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    resolve(fileReader.result);
                };
                fileReader.onerror = (error) => {
                    reject(error);
                };
            });
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 60 * 1024) { // 60 KB
                alert('File is too big! Please upload an image smaller than 60 KB.');
                event.target.value=""; // clear the file
                return;
            }
            setMealPics(file);
        }
    };

    const handleStarsHover = (ratingValue) => {
        setStars(ratingValue);
    };

    const handleCommentsChange = (comment) => {
        setComments(comment.target.value);
        const starNotSet = stars === 0;
        setShowError(starNotSet);
    };

    const handlePicsModeChange = (mode) => {
        setPicsMode(mode);
        if (mode === 'camera') {
            setMealPics(null);
            startCamera();
        } else {
            stopCamera();
        }
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            mediaStreamRef.current = stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const stopCamera = () => {
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach((track) => {
                track.stop();
            });
            mediaStreamRef.current = null;
        }
    };

    const captureImage = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.canvas.width = 320;
        context.canvas.height = 240;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
            setMealPics(blob);
        }, 'image/jpeg');
    };

    return (
        <div className  ="review-box">
            <h1>New Entry</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <div className="left-inputs">
                        <label htmlFor="mealPics">Picture</label>
                        <select
                            value={picsMode}
                            onChange={(e) => handlePicsModeChange(e.target.value)}
                        >
                            <option value="upload">File Upload</option>
                            <option value="camera">Take a Photo</option>
                        </select>
                        {picsMode === 'upload' && (
                            <input id="meal-pic" type="file" accept="image/*" onChange={handleImageUpload} required />
                        )}
                        {picsMode === 'camera' && (
                            <>
                                <div className="camera-preview">
                                    <video ref={videoRef} autoPlay></video>
                                    {mealPics ? (
                                        <img src={URL.createObjectURL(mealPics)} alt="Captured" />
                                    ) : (
                                        <canvas
                                            ref={canvasRef}
                                            style={{ display: 'block' }}
                                        ></canvas>
                                    )}
                                </div>
                                {mealPics ? (
                                    <button type="button" onClick={() => setMealPics(null)}>
                                        Retake
                                    </button>
                                ) : (
                                    <button type="button" onClick={captureImage}>
                                        Take Photo
                                    </button>
                                )}
                            </>
                        )}
                        <label htmlFor="mealName">Meal Name*</label>
                        <input
                            id="mealName"
                            type="text"
                            value={mealName}
                            onChange={(e) => setMealName(e.target.value)}
                            ref={mealNameRef}
                            required
                        />
                        <label htmlFor="restaurant">Restaurant</label>
                        <input
                            id="restaurant"
                            type="text"
                            value={restaurant}
                            onChange={(e) => setRestaurant(e.target.value)}
                        />
                        <label htmlFor="stars">Rating*</label>
                        <div className="rating">
                            <div className="star-rating">
                                {[...Array(5)].map((star, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <label key={ratingValue}>
                                            <input
                                                type="radio"
                                                value={ratingValue}
                                                onClick={() => {
                                                    setStars(ratingValue);
                                                    setShowError(false);
                                                }}
                                                onMouseOver={() => handleStarsHover(ratingValue)}
                                                onMouseOut={() => handleStarsHover(stars)}
                                            />
                                            <span
                                                className={`star ${ratingValue <= stars ? 'on' : 'off'}`}
                                            >
                                                &#9733;
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                            {showError && <p>Please select a rating.</p>}
                        </div>
                        <label htmlFor="comments">Comments*</label>
                        <textarea
                            id="comments"
                            type="text"
                            placeholder="Comments"
                            onChange={handleCommentsChange}
                            required
                        />
                        <label htmlFor="tag">Tags</label>
                        <input
                            id="tag"
                            type="text"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                        />
                    </div>
                </div>
                {errorMessages.length > 0 && (
                    <div className="error-messages">
                        {errorMessages.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
                <div id="button-group">
                    
                    <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default ReviewPage;