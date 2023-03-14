const fs = require("fs");

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

  // Loop through the ingredientsRef and calculate the total calories for the recipe
  for (let ingredient of recipe.ingredients) {
    // Get the ingredient from the ingredientsRef
    let ingredientRef;

    for (let i of ingredientsRef) {
      if (i.id === ingredient.id) {
        ingredientRef = i.nutrition;
        break;
      }
    }

    // Calculate the calories for the ingredient
    let ingredientCalories = ingredientRef.calories * ingredient.quantity;

    // Add the calories to the total calories
    totalCalories += ingredientCalories;
  }

  // Return the recipe nutritional information
  return totalCalories;
};

// Export the functions
module.exports = {
  readFile,
  writeFile,
  analyzeRecipe,
};
