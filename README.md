# Content of the Client folder is in the Master branch of this Repository

## MyRecipeApp Description
MyRecipe App is a MERN stack project with Authentication using JWT. User Register and Login into the App. Users add new recipes, save the recipes after login and see different Recipes shared on the App.

## Structure
#### server module for backed code 
- `node_modules`: file store modules required for projects.
- `src/models/Recipes.js`: file store code for the Recipe model.
- `src/models/Users.js`: file store code for the User model.
- `src/routes/recipes.js`: file store code for recipe routes.
- `src/routes/user.js`: file store code for user routes.
- `src/index.js`: main backend code file.

#### Client module for frontend code 
- `public`: contains the frontend scripts, images, and logos.
- `src/components`: contains components navbar.
- `src/hooks`: contain hook code for getUserId.
- `src/pages`: contain pages auth.js,create-recipe.js,saved-recipe.js, home.js.
- `src/app.js`: contain routing between pages.
- `src/index.js`: main code file for frontend.

## Features:
- User login and Register using userId and Password.
- See uploaded recipes on the home page.
- Create a new recipe.
- Upload new recipes to the database.
- Saved the recipes after login.
- connected to MongoDB database.
- JWT authentication.

## TechStack Used:
- `Client`: React, CSS, JavaScript.
- `Server`: Express.js, Mongoose, React-router-dom, MongoDB
- `Modules`: JWT authentication, Bicrypt, Nodemon



