// client/src/pages/SavedRecipes.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!userID) return; // prevent calling with undefined
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`, {
          headers: { authorization: cookies.access_token }
        });
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error("Error fetching saved recipes:", err.response?.data || err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  return (
    <div>
      <h2>Saved Recipes</h2>
      {savedRecipes.length === 0 ? (
        <p>No recipes saved yet</p>
      ) : (
        <ul>
          {savedRecipes.map((recipe) => (
            <li key={recipe._id} className="recipe-card">
              <h3>{recipe.name}</h3>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>{recipe.instructions}</p>
              <p>
                <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedRecipes;
