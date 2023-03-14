const fs = require("fs");

/**
 * Custom made fuction to read from the Json file
 * File path: ./API/data/{file name}.json
 * @param {string} filePath - The path to the file
 * @param {string} encoding - The encoding type
 * @returns {Object} - The recipes object
 */
const readFile = (filePath, encoding = "utf8") => {
  try {
    const data = fs.readFileSync(filePath, encoding);

    // If the file is empty, return an empty array
    if (!data.length) {
      return [];
    } else {
      // If the file is not empty, return the data
      return JSON.parse(data);
    }
  } catch (err) {
    console.log("Error reading file", err);
  }
};

/**
 * Custom made fuction to re-write the entire Json file
 * File path: ./API/data/{file name}.json
 * @param {string} filePath - The path to the file
 * @param {Object} recipeList - The recipes object
 */
const writeFile = (filePath, recipeList) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(recipeList));
  } catch (err) {
    console.log("Error writing file", err);
  }
};

// Export the functions
module.exports = {
  readFile,
  writeFile,
};
