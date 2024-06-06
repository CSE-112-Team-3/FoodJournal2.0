import React, { useState } from 'react';
import './Recipes.css';
import NavBar from '../../components/navbar';
import shallotPastaImage from '../../assets/shallotPasta.png'

export default function Recipes() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const applicationId = 'bb206c81';
  const applicationKey = '77d012b2a2ae30af566e9bdc7434331b	';

  const searchRecipes = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = `https://api.edamam.com/search?q=${query}&app_id=${applicationId}&app_key=${applicationKey}`;
    console.log('Request URL:', url); 

    try {
      const response = await fetch(url);
      console.log('Response:', response); 

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      setRecipes(data.hits);
    } catch (err) {
      setError(`Failed to fetch recipes. Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipes-container jockey-one-regular">
      <NavBar />
      <div className ="recipe-post-container">
        <div className ="recipe-of-the-week reddit-sans-condensed">
          <h2>Recipe of the week:</h2>
          <div className ="recipe-card">
          <img className="recipe-image-placeholder" src={shallotPastaImage} alt="Caramelized Shallot Pasta" />
            <div className = "recipe-info">
            <h3 className = "shallotPastaText">
                <a href="https://cooking.nytimes.com/recipes/1020830-caramelized-shallot-pasta?algo=cooking_search_relevance_metric_ios_and_web&fellback=false&imp_id=5159509269013095&req_id=7855108512283556&surface=cooking-search-web&variant=0_relevance_reranking" target="_blank" rel="noopener noreferrer">
                    Caramelized Shallot Pasta
                </a>
            </h3>
              <h4> Cook Time: 40 minutes</h4>
              <p className = "shallotPasta "> This pasta is all about the shallots,cooked down in a bath of olive oil to a jammy, caramelized paste. Pair it with a glass of Pinot Noir</p>
              <p className = "shallotPasta ">for a perfect dinner filled with rich flavors.</p>
            </div>
          </div>
        </div>
        {/**
        <div className="tags-section reddit-sans-condensed">
          <h3>Tags:</h3>
          <div className="tags">
            <button className="tag vegetarian reddit-sans-condensed">Vegetarian</button>
            <button className="tag high-protein reddit-sans-condensed">High Protein</button>
            <button className="tag quick reddit-sans-condensed">{"< 15 minutes"}</button>
          </div>
  </div> */}
        <div>
          <h1>Recipe Search</h1>
          <form onSubmit={searchRecipes}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for recipes..."
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
          {error && <p>{error}</p>}
          <div className="recipes">
            {recipes.map((recipeData) => (
              <div key={recipeData.recipe.uri} className="recipe">
                <h2>{recipeData.recipe.label}</h2>
                <img src={recipeData.recipe.image} alt={recipeData.recipe.label} />
                <p>{recipeData.recipe.source}</p>
                <a href={recipeData.recipe.url} target="_blank" rel="noopener noreferrer">
                  View Recipe
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
