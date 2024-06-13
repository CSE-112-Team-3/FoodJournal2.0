import React, { useState, useEffect } from 'react';
import './Recipes.css';
import NavBar from '../../components/navbar';
import shallotPastaImage from '../../assets/shallotPasta.png';

export default function Recipes() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pastaBank, setPastaBank] = useState([]);
  const [pastaOfTheWeek, setPastaOfTheWeek] = useState();

  const applicationKey =  import.meta.env.VITE_APP_EDAMAM_API_KEY;
  const applicationId =  import.meta.env.VITE_APP_EDAMAM_API_ID;

  useEffect(() => {
    const getPasta = async() => {
      setLoading(true);
      setError(null);
      const url = `https://api.edamam.com/search?q=pasta&app_id=${applicationId}&app_key=${applicationKey}`;
  
      try {
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
  
        const data = await response.json();
        setPastaBank(data.hits);
      } catch (err) {
        console.log(`Failed to fetch recipes. Error: ${err}`);
      } finally {
        setLoading(false);
      }
    }
    getPasta();
  }, [applicationId, applicationKey]);

  useEffect(() => {
    const selectPastaOfTheWeek = () => {
      if (pastaBank.length > 0) {
        const randomPasta = pastaBank[Math.floor(Math.random() * pastaBank.length)];
        setPastaOfTheWeek(randomPasta);
      }
    };

    selectPastaOfTheWeek();
    console.log(pastaOfTheWeek);
  }, [pastaBank]);

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
      <div className="recipe-post-container">
        <div className="recipe-of-the-week reddit-sans-condensed">
          <h2>Recommended Pasta Recipe:</h2>
          <div className="recipe-card">
            { pastaOfTheWeek ? (
              <>
                <img className="recipe-image-placeholder" src={pastaOfTheWeek.recipe.image} alt={pastaOfTheWeek.recipe.label} />
                <div className="recipe-info">
                  <h3 className="shallotPastaText">
                    {pastaOfTheWeek.recipe.label}
                  </h3>
                  <p className="shallotPasta">Check out this pasta dish! If you don't like what we have to offer, feel free to refresh the page for a new pasta dish!</p>
                  <a href={pastaOfTheWeek.recipe.url}>
                    View Recipe
                  </a>
                </div>              
              </>
            ) : <p>...Loading</p>
            }

          </div>
        </div>
        <div className="recipeSearch reddit-sans-condensed">
          <h1>Recipe Search</h1>
          <form onSubmit={searchRecipes} className="search-form">
            <div className="search-container">
              <input
                className="searchBox"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find new recipes..."
                required
              />
              <button type="submit" disabled={loading} className="searchButton">
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
          {error && <p>{error}</p>}
          <div className="recipes-grid">
            {recipes.map((recipeData) => (
              <div key={recipeData.recipe.uri} className="search-result">
                <img src={recipeData.recipe.image} alt={recipeData.recipe.label} />
                <div className="recipe-info">
                  <h2>{recipeData.recipe.label}</h2>
                  <a href={recipeData.recipe.url} target="_blank" rel="noopener noreferrer">
                    View Recipe
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
