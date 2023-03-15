const express = require("express");
const { verifyToken, loadIngredients } = require("../src/utils");

const router = express.Router();
/**
 * GET /ingredients
 * Purpose: Get all ingredients
 */
router.get("/", (req, res) => {
  // Get the token from the request header
  //Authorization: 'Bearer TOKEN'
  const token = req.headers.authorization?.split(" ")[1];

  // Verify the token
  if (!verifyToken(token)) {
    res.status(401).send("Unauthorized request");
  }

  // Return the ingredients
  res.json(loadIngredients());
});

module.exports = router;
