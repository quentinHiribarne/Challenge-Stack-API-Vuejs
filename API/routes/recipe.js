const express = require("express");
const { readFile, writeFile, analyzeRecipe } = require("../src/utils");

const router = express.Router();

// Get recipes from Json file: /API/data/recipes.json
const recipesFile = process.cwd() + "/data/recipes.json";
let recipes = readFile(recipesFile);

/**
 * POST /recipe
 * Purpose: Create a recipe
 */
router.post("/", (req, res) => {
  // Get recipe from the request body
  let recipe = req.body;

  // Generate unique id for the recipe
  let id = Math.random().toString(36).substr(2, 9);

  // check if the id is unique
  while (recipes.some((i) => i.id === id)) {
    console.log("id is not unique");
    id = Math.random().toString(36).substr(2, 9);
  }

  // Genereate current date then format it
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Add publication date to the recipe object
  recipe.publication_date = `${day}/${month}/${year}`;

  // Add id to the recipe object
  recipe = { id, ...recipe };

  // Add recipe to the recipes array
  recipes.push(recipe);

  // Add recipe to the recipes.json file
  writeFile(recipesFile, recipes);

  res.send("recipe is added to the database");
});

/**
 * GET /recipe/:id
 * Purpose: Get a recipe by id
 * Params: {id} - id of the recipe
 */
router.get("/:id", (req, res) => {
  // Reading id from the URL
  const id = req.params.id;

  // Searching recipes for the id
  for (let recipe of recipes) {
    if (recipe.id === id) {
      res.json(recipe);
      return;
    }
  }

  // Sending 404 when recipe not found
  res.status(404).send("recipe not found");
});

/**
 * DELETE /recipe/:id
 * Purpose: Delete a recipe by id
 * Params: {id} - id of the recipe
 */
router.delete("/:id", (req, res) => {
  // Reading id from the URL
  const id = req.params.id;
  let status, message;

  // Remove item from the recipes array
  recipes = recipes.filter((recipe) => {
    // If the id is different, keep the item in the array
    if (recipe.id !== id) {
      // Set the status and message
      res.status(200).send("recipe not found");

      return true;
    }
    // Else, set the status and message and remove the item from the array

    // Write the upadted list to the recipes.json file
    writeFile(recipesFile, recipes);

    res.status(200).send("recipe deleted");

    return false;
  });
});

/**
 * PUT /recipe/:id
 * Purpose: Edit a recipe by id
 * Params: {id} - id of the recipe
 */
router.put("/:id", (req, res) => {
  // Reading id from the URL
  const id = req.params.id;
  const newrecipe = req.body;
  let status, message;

  // Schearch recipes for the id
  for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];

    // If the id is found, update the recipe, else send 404
    if (recipe.id === id) {
      recipes[i] = newrecipe;

      // Write the upadted list to the recipes.json file
      writeFile(recipesFile, recipes);

      res.status(200).send("recipe updated");
    } else {
      res.status(404).send("recipe not found");
    }
  }
});

/**
 * GET /recipe/analyze
 * Purpose: Analyze a recipe nutritional value
 */
router.get("/analyze", (req, res) => {
  // Verify the token
  if (!verifyToken(req)) {
    res.status(401).send("Unauthorized request");
  }

  //Get recipe from the request body
  let recipe = req.body;

  let totalCalories = analyzeRecipe(recipe);

  res.json({
    totalCalories,
  });
});

module.exports = router;
