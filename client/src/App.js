import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import './App.css';

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import CreateRecipe from "./pages/create-recipe";
import SavedRecipes from "./pages/saved-recipes";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
