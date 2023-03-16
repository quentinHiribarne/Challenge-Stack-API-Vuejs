const express = require("express");
const { writeFile, verifyToken, loadIngredients } = require("../src/utils");

const router = express.Router();

// Path to the ingredients.json file
const ingredientsFile = process.cwd() + "/data/ingredients.json";

/**
 * POST /ingredient
 * Purpose: Create a ingredient
 */
router.post("/", (req, res) => {
  // Get the token from the request header
  //Authorization: 'Bearer TOKEN'
  const token = req.headers.authorization?.split(" ")[1];

  // Verify the token
  if (!verifyToken(token)) {
    res.status(401).send("Unauthorized request");
  }

  // Get ingredient from the request body
  let ingredient = req.body;

  // Get ingredients from the ingredients.json file
  let ingredients = loadIngredients();

  // Generate unique id for the ingredient
  let id = Math.random().toString(36).substr(2, 9);

  // check if the id is unique
  while (ingredients.some((i) => i.id === id)) {
    console.log("id is not unique");
    id = Math.random().toString(36).substr(2, 9);
  }

  // Genereate current date then format it
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Add id and publication date to the ingredient object
  ingredient = {
    id,
    publication_date: `${day}/${month}/${year}`,
    ...ingredient,
  };

  // Add ingredient to the ingredients array
  ingredients.push(ingredient);

  // Add ingredient to the ingredients.json file
  writeFile(ingredientsFile, ingredients);

  res.status(201).json(loadIngredients());
});

/**
 * GET /ingredient/:id
 * Purpose: Get a ingredient by id
 * Params: {id} - id of the ingredient
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

  // Searching ingredients for the id
  for (let ingredient of ingredients) {
    if (ingredient.id === id) {
      res.json(ingredient);
      return;
    }
  }

  // Sending 404 when ingredient not found
  res.status(404).send("ingredient not found");
});

/**
 * DELETE /ingredient/:id
 * Purpose: Delete a ingredient by id
 * Params: {id} - id of the ingredient
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

  // Get ingredients from the ingredients.json file
  let ingredients = loadIngredients();

  // Schearch ingredients for the id
  if (ingredients.some((ingredient) => ingredient.id == id)) {
    // If the id is found, remove the ingredient from the array
    ingredients = ingredients.filter((ingredient) => ingredient.id != id);

    // Write the upadted list to the ingredients.json file
    writeFile(ingredientsFile, ingredients);

    res.status(200).json(loadIngredients());
  } else {
    res.status(404).send("ingredient not found");
  }
});

/**
 * PUT /ingredient/:id
 * Purpose: Edit a ingredient by id
 * Params: {id} - id of the ingredient
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
  const newingredient = req.body;

  // Get ingredients from the ingredients.json file
  let ingredients = loadIngredients();

  // Schearch ingredients for the id
  if (ingredients.some((ingredient) => ingredient.id == id)) {
    // If the id is found, update the ingredient
    ingredients = ingredients.map((ingredient) => {
      if (ingredient.id == id) {
        return {
          ...ingredient,
          ...newingredient,
        };
      }

      return ingredient;
    });

    // Write the upadted list to the ingredients.json file
    writeFile(ingredientsFile, ingredients);

    res.status(200).json(loadIngredients());
  } else {
    res.status(404).send("ingredient not found");
  }
});

module.exports = router;
