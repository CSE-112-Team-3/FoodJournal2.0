import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import './NewReviewPage.css';
import backgroundImage from '../../assets/background.jpg';


function ReviewPage() {
    const [mealName, setMealName] = useState('');
    const [mealPics, setMealPics] = useState('');
    const [picsMode, setPicsMode] = useState('upload');
    const [stars, setStars] = useState(0);
    const [comments, setComments] = useState('');

    const videoRef = useRef(null);
    const mediaStreamRef = useRef(null);
    const canvasRef = useRef(null);

    const mealNameRef = useRef(null);

    useEffect(() => {
        mealNameRef.current.focus();
    
      }, []);

    useEffect(() => {
      document.body.style.backgroundImage = `url(${backgroundImage})`;
      document.body.style.backgroundSize = 'cover';
  
      return () => {
        document.body.style.backgroundImage = '';
        document.body.style.backgroundSize = '';
      };
    }, [])
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // send stuff to backend
      console.log('MealName:', mealName);
      console.log('MealPics:', mealPics);
      console.log('Stars:', stars);
      console.log('Comments:', comments);
    };

    const handleImageUpload = (event) => {
        setMealPics(event.target.files[0]);
      };

    const handleStarsHover = (ratingValue) => {
        setStars(ratingValue);
      };

    const handlePicsModeChange = (mode) => {
        setPicsMode(mode);
        if (mode === 'camera') {
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
      <div className="review-box reddit-sans-condensed">
        <h1>New Entry</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="left-inputs">
            <label htmlFor="mealName">Meal Name</label>
            <input
              id="mealName"
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              ref={mealNameRef}
              required
            />
            <label htmlFor="stars">Rating</label>
            <div className="rating">
            <div className="star-rating">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                  return (
                    <label key={ratingValue}>
                      <input
                        type="radio"
                        value={ratingValue}
                        onClick={() => setStars(ratingValue)}
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
              <label htmlFor="comments">Comments</label>
              <input
                id="comments"
                text="text"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
              />
            </div>
            <label htmlFor="mealPics">Picture</label>
              <select
                value={picsMode}
                onChange={(e) => handlePicsModeChange(e.target.value)}
                >
                <option value="upload">File Upload</option>
                <option value="camera">Take a Photo</option>
              </select>
              {picsMode === 'upload' && (
                <input type="file" accept="image/*" onChange={handleImageUpload} />
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
               <button className="submit">Save Review</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
  
  export default ReviewPage;