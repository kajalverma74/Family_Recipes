// models/Recipe.js
const mongoose = require('mongoose');

// Define a schema for a recipe
const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    method: {
        type: String,
        required: true
    },
});

// Create a model from the schema
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
