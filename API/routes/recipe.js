const express = require("express");
const {
  writeFile,
  analyzeRecipe,
  verifyToken,
  loadRecipes,
} = require("../src/utils");

const router = express.Router();

// Path to the recipes.json file
const recipesFile = process.cwd() + "/data/recipes.json";

/**
 * POST /recipe
 * Purpose: Create a recipe
 */
router.post("/", (req, res) => {
  // Get the token from the request header
  //Authorization: 'Bearer TOKEN'
  const token = req.headers.authorization?.split(" ")[1];

  // Verify the token
  if (!verifyToken(token)) {
    res.status(401).send("Unauthorized request");
  }

  // Get recipe from the request body
  let recipe = req.body;

  // Get recipes from the recipes.json file
  let recipes = loadRecipes();

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

  res.status(201).json(loadRecipes());
});

/**
 * GET /recipe/:id
 * Purpose: Get a recipe by id
 * Params: {id} - id of the recipe
 */
router.get("/:id", (req, res) => {
  // Get the token from the request header
  //Authorization: 'Bearer TOKEN'
  const token = req.headers.authorization?.split(" ")[1];

  // Verify the token
  if (!verifyToken(token)) {
    res.status(401).send("Unauthorized request");
  }

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
  // Get the token from the request header
  //Authorization: 'Bearer TOKEN'
  const token = req.headers.authorization?.split(" ")[1];

  // Verify the token
  if (!verifyToken(token)) {
    res.status(401).send("Unauthorized request");
  }

  // Reading id from the URL
  const id = req.params.id;

  // Get recipes from the recipes.json file
  let recipes = loadRecipes();

  // Searching recipes for the id then remove the recipe, or send 404
  for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];

    if (recipe.id === id) {
      recipes.splice(i, 1);
      writeFile(recipesFile, recipes);
      res.status(200).json(loadRecipes());
      return;
    }
  }

  res.status(404).send("recipe not found");
});

/**
 * PUT /recipe/:id
 * Purpose: Edit a recipe by id
 * Params: {id} - id of the recipe
 */
router.put("/:id", (req, res) => {
  // Get the token from the request header
  //Authorization: 'Bearer TOKEN'
  const token = req.headers.authorization?.split(" ")[1];

  // Verify the token
  if (!verifyToken(token)) {
    res.status(401).send("Unauthorized request");
  }

  // Reading id from the URL
  const id = req.params.id;
  const newrecipe = req.body;

  // Get recipes from the recipes.json file
  let recipes = loadRecipes();

  // Schearch recipes for the id
  for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];

    // If the id is found, update the recipe, else send 404
    if (recipe.id === id) {
      recipes[i] = newrecipe;

      // Write the upadted list to the recipes.json file
      writeFile(recipesFile, recipes);

      // send the updated recipe list and 200 status
      res.status(200).json(loadRecipes());
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
  // Get the token from the request header
  //Authorization: 'Bearer TOKEN'
  const token = req.headers.authorization?.split(" ")[1];

  // Verify the token
  if (!verifyToken(token)) {
    res.status(401).send("Unauthorized request");
  }

  // Reading id from the URL
  const id = req.params.id;

  //Get recipe from the request body
  let recipe = req.body;

  let totalCalories = analyzeRecipe(recipe);

  res.json({
    totalCalories,
  });
});

module.exports = router;
