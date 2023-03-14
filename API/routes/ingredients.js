const express = require("express");
const { verifyToken, readFile } = require("../src/utils");

const router = express.Router();
/**
 * GET /ingredients
 * Purpose: Get all ingredients
 */
router.get("/", (req, res) => {
  // Verify the token
  if (!verifyToken(req)) {
    res.status(401).send("Unauthorized request");
  }

  // Get ingredients from Json file: /API/data/ingredients.json
  let ingredients = readFile(process.cwd() + "/data/ingredients.json");

  // Return the ingredients
  res.json(ingredients);
});

module.exports = router;
