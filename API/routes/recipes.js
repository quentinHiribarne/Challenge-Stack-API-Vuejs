const express = require("express");
const { readFile, analyzeRecipe, verifyToken } = require("../src/utils");

const router = express.Router();
/**
 * GET /recipes
 * Purpose: Get all recipes
 */
router.get("/", (req, res) => {
  // Recipe example
  /*
  {
      "id": "56pj41a0j",
      "title": "string",
      "author": "string",
      "publication_date": "14/3/2023",
      "ingredients": [
          {
              "id": 1,
              "quantity": 2
          }
      ],
      "steps": [
          {
              "step": "1",
              "title": "string",
              "description": "string"
          }
      ],
      "totalCalories": 330
  }
  */

  // Verify the token
  if (!verifyToken(req)) {
    res.status(401).send("Unauthorized request");
  }

  // Get recipes from Json file: /API/data/recipes.json
  let recipes = readFile(process.cwd() + "/data/recipes.json");

  // For each recipe, calculate the nutritional information and add it to the recipe object
  for (let recipe of recipes) {
    recipe.totalCalories = analyzeRecipe(recipe);
  }

  // Return the recipes
  res.json(recipes);
});

module.exports = router;
