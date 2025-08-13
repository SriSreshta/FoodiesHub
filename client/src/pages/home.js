// client/src/pages/Home.js
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const [cookies] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes || []);
      } catch (err) {
        console.error("Error fetching saved recipes:", err);
      }
    };

    fetchRecipes();

    // only fetch saved recipes if userID is available
    if (userID) {
      fetchSavedRecipes();
    }
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      await axios.put(
        "http://localhost:3001/recipes/save",
        { recipeID },
        { headers: { Authorization: `Bearer ${cookies.access_token}` } }
      );
      alert("Recipe saved!");
      setSavedRecipes((prev) => [...prev, recipeID]);
    } catch (err) {
      console.error("Error saving recipe:", err);
      alert("Failed to save recipe");
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="page-container">
      <div className="card wide-card">
        <h1>🍲 Recipes</h1>
        <ul className="recipe-grid">
          {recipes.map((recipe) => (
            <li key={recipe._id} className="recipe-card">
              {recipe.imageUrl && (
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="recipe-image"
                />
              )}
              <div className="recipe-content">
                <h3>{recipe.name}</h3>
                <p className="muted">{recipe.instructions}</p>
                <p className="muted">⏱ {recipe.cookingTime} minutes</p>
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                  className={
                    isRecipeSaved(recipe._id) ? "secondary-btn" : "primary-btn"
                  }
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
