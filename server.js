// server.js (or app.js)
const express = require("express");
const connectDB = require("./db");
const Recipe = require("./models/recipes");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
connectDB();

app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching recipes" });
  }
});

// API route to add a new recipe
app.post("/recipes", async (req, res) => {
  const { name, ingredients, method } = req.body;

  if (!name || !ingredients || !method) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newRecipe = new Recipe({
      name,
      ingredients,
      method,
    });
    const savedRecipe = await newRecipe.save();
    res.json(savedRecipe);
  } catch (error) {
    res.status(500).json({ error: "Error while saving recipe" });
  }
});

// API route to delete a recipe
app.delete("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error while deleting recipe" });
  }
});

// Update (PUT) a recipe by ID
app.put("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, method } = req.body;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { name, ingredients, method },
      { new: true } // This option returns the updated document
    );

    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json(updatedRecipe); // Send the updated recipe back to the client
  } catch (error) {
    res.status(500).json({ error: "Error while updating recipe" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
