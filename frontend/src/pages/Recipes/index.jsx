import './Recipes.css';
import NavBar from '../../components/navbar';
import { useState } from 'react';

export default function Recipes() {
    const [pictureNavbar, setPictureNavbar] = useState('http://ssl.gstatic.com/accounts/ui/avatar_2x.png');

    return(
        <div className="recipes-container">
            <NavBar pictureNavbar={pictureNavbar} />
            <div className="recipe-post-container">
                <div className="recipe-of-the-week">
                    <h2>Recipe of the week:</h2>
                    <div className="recipe-card">
                        <div className="recipe-image-placeholder"></div>
                        <div className="recipe-info">
                            <h3>Butternut Squash Soup</h3>
                            <p>Super yum sooo deslih</p>
                        </div>
                    </div>
                </div>
                <div className="tags-section">
                    <h3>Tags:</h3>
                    <div className="tags">
                        <button className="tag vegetarian">Vegetarian</button>
                        <button className="tag high-protein">High Protein</button>
                        <button className="tag quick">{"< 15 minutes"}</button>
                    </div>
                </div>
                <div className="other-recipes">
                    <h3>Other Recipes:</h3>
                    <div className="recipe-grid">
                        <div className="recipe-card">
                            <div className="recipe-image-placeholder"></div>
                            <div className="recipe-info">
                                <h3>Recipe 1</h3>
                                <p>Description 1</p>
                            </div>
                        </div>
                        <div className="recipe-card">
                            <div className="recipe-image-placeholder"></div>
                            <div className="recipe-info">
                                <h3>Recipe 2</h3>
                                <p>Description 2</p>
                            </div>
                        </div>
                        <div className="recipe-card">
                            <div className="recipe-image-placeholder"></div>
                            <div className="recipe-info">
                                <h3>Recipe 3</h3>
                                <p>Description 3</p>
                            </div>
                        </div>
                        <div className="recipe-card">
                            <div className="recipe-image-placeholder"></div>
                            <div className="recipe-info">
                                <h3>Recipe 4</h3>
                                <p>Description 4</p>
                            </div>
                        </div>
                        <div className="recipe-card">
                            <div className="recipe-image-placeholder"></div>
                            <div className="recipe-info">
                                <h3>Recipe 5</h3>
                                <p>Description 5</p>
                            </div>
                        </div>
                        <div className="recipe-card">
                            <div className="recipe-image-placeholder"></div>
                            <div className="recipe-info">
                                <h3>Recipe 6</h3>
                                <p>Description 6</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
