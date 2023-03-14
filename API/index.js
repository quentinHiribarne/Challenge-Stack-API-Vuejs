const express = require("express");
const cors = require("cors");

const recipesRouter = require("./routes/recipes");
const recipeRouter = require("./routes/recipe");
const tokenRouter = require("./routes/token");

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/recipes", recipesRouter);
app.use("/recipe", recipeRouter);
app.use("/token", tokenRouter);

// Starting the server
app.listen(port, () => console.log(`API listening on port ${port}!`));
