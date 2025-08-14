import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import './App.css';

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import CreateRecipe from "./pages/create-recipe";
import SavedRecipes from "./pages/saved-recipes";
import PrivateRoute from "./components/privateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
         {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

         {/* Protected routes */}
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/create-recipe" element={<PrivateRoute><CreateRecipe /></PrivateRoute>} />
          <Route path="/saved-recipes" element={<PrivateRoute><SavedRecipes /></PrivateRoute>} />
       </Routes>
      </div>
    </Router>
  );
}

export default App;
