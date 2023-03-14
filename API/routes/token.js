const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// Get public key and private key from the environment variables
const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;

/**
 * GET /token/generate
 * Purpose: Return a jwt token
 */
router.get("/generate", (req, res) => {
  let token;

  try {
    //Creating jwt token
    token = jwt.sign(
      {
        publicKey: publicKey,
      },
      privateKey,
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log("Error! Something went wrong while generating the token.", err);
  }

  res.status(200).json({
    token: token,
  });
});

module.exports = router;
