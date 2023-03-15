const express = require("express");
const { verifyToken, loadRecipes } = require("../src/utils");

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

  // Get the token from the request header
  //Authorization: 'Bearer TOKEN'
  const token = req.headers.authorization?.split(" ")[1];

  // Verify the token
  if (!verifyToken(token)) {
    res.status(401).send("Unauthorized request");
  }

  // Return the recipes
  res.json(loadRecipes());
});

module.exports = router;
