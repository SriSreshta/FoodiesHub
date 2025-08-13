import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function CreateRecipe() {
  const userID = useGetUserID();
  const [cookies] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/recipes",
        { ...recipe },
        {
          headers: { Authorization: `Bearer ${cookies.access_token}` },
        }
      );
      alert("✅ Recipe Created!");
      // Reset form fields
      setRecipe({
        name: "",
        description: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
      });
      navigate("/");
    } catch (error) {
      console.error("❌ Error creating recipe:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          "Failed to create recipe. Please make sure you are logged in."
      );
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h2>Create Recipe</h2>
        <form onSubmit={handleSubmit} className="recipe-form">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            required
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleChange}
            required
          ></textarea>

          <br />
          <label>Ingredients: </label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
              required
            />
          ))}
          <button
            type="button"
            className="btn-secondary ingredient-btn"
            onClick={handleAddIngredient}
          >
            + Add Ingredient
          </button>

          <br />
          <label>Instructions:</label>
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
          ></textarea>

          <label>Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
            required
          />

          <label>Cooking Time (minutes):</label>
          <input
            type="number"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-primary">
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRecipe;
