const fs = require("fs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Custom made fuction to read from the Json file
 * File path: ./API/data/{file name}.json
 * @param {string} filePath - The path to the file
 * @param {string} encoding - The encoding type
 * @returns {Object} - The recipes object
 */
const readFile = (filePath, encoding = "utf8") => {
  try {
    const data = fs.readFileSync(filePath, encoding);

    // If the file is empty, return an empty array
    if (!data.length) {
      return [];
    } else {
      // If the file is not empty, return the data
      return JSON.parse(data);
    }
  } catch (err) {
    console.log("Error reading file", err);
  }
};

/**
 * Custom made fuction to re-write the entire Json file
 * File path: ./API/data/{file name}.json
 * @param {string} filePath - The path to the file
 * @param {Object} recipeList - The recipes object
 */
const writeFile = (filePath, recipeList) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(recipeList));
  } catch (err) {
    console.log("Error writing file", err);
  }
};

/**
 * Custom made fuction to analyze the recipe nutritional information
 * @param {Object} recipe - The recipe object
 * @returns {Number} - The recipe nutritional information
 */
const analyzeRecipe = (recipe) => {
  let totalCalories = 0;

  // Get ingredients from the ingredients.json file
  const ingredientsFile = process.cwd() + "/data/ingredients.json";
  const ingredientsRef = readFile(ingredientsFile);

  // Check if the recipe.ingredients exists and is not empty
  if (!recipe.ingredients || !recipe.ingredients.length) {
    return "No ingredients";
  }

  // Loop through the ingredientsRef and calculate the total calories for the recipe
  for (let ingredient of recipe.ingredients) {
    // Get the ingredient from the ingredientsRef
    let ingredientRef,
      isIngredientValid = false;

    // Check if the ingredient exists in the ingredientsRef, if not, return unknown ingredient and stop the loop
    for (let i of ingredientsRef) {
      if (i.id === ingredient.id) {
        ingredientRef = i.nutrition;
        isIngredientValid = true;
        break;
      }
    }

    if (!isIngredientValid) {
      return "Unknown ingredient";
    }

    // Calculate the calories for the ingredient
    let ingredientCalories = ingredientRef.calories * ingredient.quantity;

    // Add the calories to the total calories
    totalCalories += ingredientCalories;
  }

  // Return the recipe nutritional information
  return totalCalories;
};

/**
 * Custom made fuction to verify the token
 * @param {Object} req - The request object
 * @returns {Boolean} - The token verification result
 */
const verifyToken = (token) => {
  // Get public key and private key from the environment variables
  const publicKey = process.env.PUBLIC_KEY;
  const privateKey = process.env.PRIVATE_KEY;

  // Verify if the token exists and is valid
  if (token) {
    try {
      const decoded = jwt.verify(token, privateKey);

      // Verify if the public key is the same as the one in the token
      if (decoded.publicKey === publicKey) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log("Error! Something went wrong while decoding the token.", err);
    }
  } else {
    return false;
  }
};

/**
 * Load the ingredients from the Json file and return the ingredients object
 * @returns {Object} - The ingredients object
 */
const loadIngredients = () => {
  // Get ingredients from the ingredients.json file
  const ingredientsFile = process.cwd() + "/data/ingredients.json";
  return readFile(ingredientsFile);
};

/**
 * Load the recipes from the Json file and return the recipes object with the nutritional information
 * @returns {Object} - The recipes object
 */
const loadRecipes = () => {
  // Get recipes from the recipes.json file
  const recipesFile = process.cwd() + "/data/recipes.json";
  const recipes = readFile(recipesFile);

  // For each recipe, calculate the nutritional information and add it to the recipe object
  for (let recipe of recipes) {
    recipe.totalCalories = analyzeRecipe(recipe);
  }

  // Load the ingredients
  const ingredientsList = loadIngredients();

  // For each recipe, add the ingredient name, description and nutritional information to the recipe object
  for (let recipe of recipes) {
    for (let ingredient of recipe.ingredients) {
      // Get the ingredient from the ingredientsList
      let ingredientRef;

      for (let i of ingredientsList) {
        if (i.id === ingredient.id) {
          ingredientRef = i;
          break;
        }
      }

      // Add the ingredient name, description and nutritional information to the recipe object
      ingredient.name = ingredientRef.name;
      ingredient.description = ingredientRef.description;
      ingredient.nutrition = ingredientRef.nutrition;
    }
  }

  return recipes;
};

// Export the functions
module.exports = {
  readFile,
  writeFile,
  analyzeRecipe,
  verifyToken,
  loadRecipes,
  loadIngredients,
};
