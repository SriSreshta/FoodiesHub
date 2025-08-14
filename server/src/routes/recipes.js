// backend/routes/recipes.js
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
    const { name, description, ingredients, instructions, imageUrl, cookingTime } = req.body;

    const recipe = new RecipesModel({
      _id: new mongoose.Types.ObjectId(),
      name,
      description,
      ingredients,
      instructions,
      imageUrl,
      cookingTime,
      userOwner: req.user.id,
    });

    const result = await recipe.save();

    // Automatically save the recipe to the creator's savedRecipes
    await UserModel.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { savedRecipes: result._id } },
      { new: true }
    );

    res.status(201).json({ createdRecipe: result });
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
 * @route   PUT /save
 * @desc    Save a recipe for a user (Protected)
 */
router.put("/save", verifyToken, async (req, res) => {
  try {
    const { recipeID } = req.body;
    if (!recipeID) {
      return res.status(400).json({ message: "Recipe ID is required" });
    }

    const recipe = await RecipesModel.findById(recipeID);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.savedRecipes.includes(recipeID)) {
      user.savedRecipes.push(recipeID);
      await user.save();
    }

    res.status(200).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    console.error("Error saving recipe:", err);
    res.status(500).json({ message: "Failed to save recipe" });
  }
});

/**
 * @route   GET /savedRecipes/ids/:userId
 * @desc    Get only IDs of saved recipes
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
 * @desc    Get full saved recipes
 */
router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId).populate("savedRecipes");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    console.error("Error fetching saved recipes:", err);
    res.status(500).json({ message: "Failed to fetch saved recipes" });
  }
});

export default router;
