import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  return (
    <div className="page-container">
      <div className="card">
        <h2>Saved Recipes</h2>
        {savedRecipes.length === 0 ? (
          <p>No recipes saved yet.</p>
        ) : (
          <ul className="recipe-list">
            {savedRecipes.map((recipe) => (
              <li key={recipe._id} className="recipe-card">
                <h3>{recipe.name}</h3>
                <img src={recipe.imageUrl} alt={recipe.name} />
                <p>{recipe.description}</p>
                <p>
                  <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SavedRecipes;
