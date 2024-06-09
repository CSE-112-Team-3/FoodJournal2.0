import React, { useState, useEffect, useRef } from 'react';
import './Update.css';
import StaticStarRating from '../../components/staticStarRating';

function UpdatePage({ isOpen, onClose, post, onSave }) {
    if (!isOpen) return null;

    const [formData, setFormData] = useState(post);
    const [chosePhoto, setOption] = useState(false);
    const [stars, setStars] = useState(2);
    const [picsMode, setPicsMode] = useState('upload');
    const [mealPics, setMealPics] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const mediaStreamRef = useRef(null);
    const handleStarsHover = (ratingValue) => {
        setStars(ratingValue);
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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 60 * 1024) { // 60 KB
                alert('File is too big! Please upload an image smaller than 60 KB.');
                event.target.value=""; // clear the file
                return;
            }
            setFormData({
                ...formData,
                images: URL.createObjectURL(file)
            });
        }
    };
    const captureImage = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.canvas.width = 320;
        context.canvas.height = 240;
        setOption(true);
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
            setMealPics(blob);
        }, 'image/jpeg');
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
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image: URL.createObjectURL(file)
        });
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                {/* <h2>Edit Post</h2>
                <label>Image:</label>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                /> */}
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
                {formData.images && !chosePhoto && (
                    <img src={formData.images} alt="Post Image" className="image-preview" />
                )}
                <label>Username:</label>
                <input 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                />
                <label>Meal Name:</label>
                <input 
                    type="text" 
                    name="mealName" 
                    value={formData.mealName} 
                    onChange={handleChange} 
                />
                <label>Description:</label>
                <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                />
                <label>Restaurant:</label>
                <input 
                    type="text" 
                    name="restaurant" 
                    value={formData.restaurant || ''} 
                    onChange={handleChange} 
                />
                <label>Rating:</label>
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
                </div>
                <label>Comments:</label>
                <textarea 
                    name="comments" 
                    value={formData.comments || ''} 
                    onChange={handleChange} 
                />
                <label>Tags:</label>
                <input 
                    type="text" 
                    name="tags" 
                    value={formData.tags || ''} 
                    onChange={handleChange} 
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Close</button>
                <button className='deleteButton'>Delete</button>
            </div>
        </div>
    );
}

export default UpdatePage;
