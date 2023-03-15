const express = require("express");
const { readFile, writeFile, verifyToken } = require("../src/utils");

const router = express.Router();

// Get ingredients from Json file: /API/data/ingredients.json
const ingredientsFile = process.cwd() + "/data/ingredients.json";
let ingredients = readFile(ingredientsFile);

/**
 * POST /ingredient
 * Purpose: Create a ingredient
 */
router.post("/", (req, res) => {
  // Verify the token
  if (!verifyToken(req)) {
    res.status(401).send("Unauthorized request");
  }

  // Get ingredient from the request body
  let ingredient = req.body;

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

  res.send("ingredient is added to the database");
});

/**
 * GET /ingredient/:id
 * Purpose: Get a ingredient by id
 * Params: {id} - id of the ingredient
 */
router.get("/:id", (req, res) => {
  // Verify the token
  if (!verifyToken(req)) {
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
  // Verify the token
  if (!verifyToken(req)) {
    res.status(401).send("Unauthorized request");
  }

  // Reading id from the URL
  const id = req.params.id;

  // Schearch ingredients for the id
  if (ingredients.some((ingredient) => ingredient.id === id)) {
    // If the id is found, remove the ingredient
    ingredients = ingredients.filter((ingredient) => ingredient.id !== id);

    // Write the upadted list to the ingredients.json file
    writeFile(ingredientsFile, ingredients);

    res.status(200).send("ingredient deleted");
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
  // Verify the token
  if (!verifyToken(req)) {
    res.status(401).send("Unauthorized request");
  }

  // Reading id from the URL
  const id = req.params.id;
  const newingredient = req.body;

  // Schearch ingredients for the id
  if (ingredients.some((ingredient) => ingredient.id === id)) {
    // If the id is found, update the ingredient
    ingredients = ingredients.map((ingredient) => {
      if (ingredient.id === id) {
        return {
          ...ingredient,
          ...newingredient,
        };
      }

      return ingredient;
    });

    // Write the upadted list to the ingredients.json file
    writeFile(ingredientsFile, ingredients);

    res.status(200).send("ingredient updated");
  } else {
    res.status(404).send("ingredient not found");
  }
});

module.exports = router;