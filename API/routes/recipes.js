const express = require("express");
const { readFile } = require("../src/utils");

const router = express.Router();
/**
 * GET /recipes
 * Purpose: Get all recipes
 */
router.get("/", (req, res) => {
  // Get recipes from Json file: /API/data/recipes.json
  res.json(readFile(process.cwd() + "/data/recipes.json"));
});

module.exports = router;
