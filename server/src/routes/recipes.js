import express from "express";
import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./user.js";

const router = express.Router();

/**
 * @route   GET /
 * @desc    Get all recipes
 */
router.get("/", async (req, res) => {
  try {
    const recipes = await RecipesModel.find({});
    res.status(200).json(recipes);
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
});

/**
 * @route   POST /
 * @desc    Create a new recipe (Protected)
 */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, image, ingredients, instructions, imageUrl, cookingTime, userOwner } = req.body;

    const recipe = new RecipesModel({
      _id: new mongoose.Types.ObjectId(),
      name,
      image,
      ingredients,
      instructions,
      imageUrl,
      cookingTime,
      userOwner,
    });

    const result = await recipe.save();
    res.status(201).json({
      createdRecipe: {
        _id: result._id,
        name: result.name,
        image: result.image,
        ingredients: result.ingredients,
        instructions: result.instructions,
        cookingTime: result.cookingTime,
        userOwner: result.userOwner,
      },
    });
  } catch (err) {
    console.error("Error creating recipe:", err);
    res.status(500).json({ message: "Failed to create recipe" });
  }
});

/**
 * @route   GET /:recipeId
 * @desc    Get a recipe by ID
 */
router.get("/:recipeId", async (req, res) => {
  try {
    const recipe = await RecipesModel.findById(req.params.recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (err) {
    console.error("Error fetching recipe by ID:", err);
    res.status(500).json({ message: "Failed to fetch recipe" });
  }
});

/**
 * @route   PUT /
 * @desc    Save a recipe for a user
 */
router.put("/", async (req, res) => {
  try {
    const { recipeID, userID } = req.body;

    const recipe = await RecipesModel.findById(recipeID);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const user = await UserModel.findById(userID);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent duplicate saves
    if (!user.savedRecipes.includes(recipeID)) {
      user.savedRecipes.push(recipe);
      await user.save();
    }

    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    console.error("Error saving recipe:", err);
    res.status(500).json({ message: "Failed to save recipe" });
  }
});

/**
 * @route   GET /savedRecipes/ids/:userId
 * @desc    Get IDs of saved recipes for a user
 */
router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    console.error("Error fetching saved recipe IDs:", err);
    res.status(500).json({ message: "Failed to fetch saved recipe IDs" });
  }
});

/**
 * @route   GET /savedRecipes/:userId
 * @desc    Get saved recipes for a user
 */
router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const savedRecipes = await RecipesModel.find({
      _id: { $in: user.savedRecipes },
    });

    res.status(200).json({ savedRecipes });
  } catch (err) {
    console.error("Error fetching saved recipes:", err);
    res.status(500).json({ message: "Failed to fetch saved recipes" });
  }
});

export default router;
