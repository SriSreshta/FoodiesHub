import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          RecipeApp
        </Link>

        <div className="navbar-menu">
          <Link to="/">Home</Link>
          <Link to="/create-recipe">Create Recipe</Link>
          <Link to="/saved-recipes">Saved Recipes</Link>
          {!cookies.access_token ? (
            <>
              <Link to="/auth">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
