import React from "react";
import "./IngredientForm.css";

// IngredientForm component handles the dynamic addition, removal, and updating of ingredients
// within the recipe optimization tool. It allows users to add multiple ingredients
// and input their properties (name, price, and calories).

const IngredientForm = ({ ingredients, setIngredients }) => {
  // Function to add a new empty ingredient to the list
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", price: "", calories: "" }]);
  };

  // Function to handle changes to any ingredient's properties (name, price, or calories)
  const handleChange = (index, field, value) => {
    const updated = [...ingredients]; // Copy the existing ingredients array
    updated[index][field] = field === "name" ? value : parseFloat(value) || 0; // Parse numbers where needed
    setIngredients(updated); // Update the ingredients state with the modified list
  };

  // Function to remove an ingredient at a specific index
  const handleRemoveIngredient = (index) => {
    const updated = [...ingredients]; // Copy the ingredients array
    updated.splice(index, 1); // Remove the ingredient at the specified index
    setIngredients(updated); // Update the ingredients state with the modified list
  };

  return (
    <div className="ingredient-form">
      <h3 className="section-title">Ingredients</h3>

      {/* Map through the list of ingredients to render each ingredient's input fields */}
      {ingredients.map((ingredient, index) => (
        <div key={index} className="ingredient-card">
          <div className="ingredient-header">
            {/* Display ingredient title with dynamic alphabet-based naming */}
            <h4 className="ingredient-title">
              Ingredient {String.fromCharCode(65 + index)}
            </h4>

            {/* Remove button to delete the specific ingredient */}
            <button
              type="button"
              className="remove-button"
              style={{
                background: "none",
                border: "none",
                color: "#f44336",
                fontSize: "1.2rem",
                width: "1.5rem",
                height: "1.5rem",
                minWidth: 0,
                minHeight: 0,
                padding: 0,
                marginLeft: "0.5rem",
                lineHeight: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                flexShrink: 0,
                overflow: "hidden",
                boxSizing: "border-box",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onClick={() => handleRemoveIngredient(index)}
            >
              ✖️
            </button>
          </div>

          {/* Input field for ingredient name */}
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Name"
              value={ingredient.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
          </div>

          {/* Input field for ingredient price per gram */}
          <div className="form-group">
            <label>Price (CHF/g):</label>
            <input
              type="number"
              placeholder="e.g. 0.025"
              step="0.001"
              value={ingredient.price}
              onChange={(e) => handleChange(index, "price", e.target.value)}
            />
          </div>

          {/* Input field for ingredient calories per gram */}
          <div className="form-group">
            <label>Calories (per g):</label>
            <input
              type="number"
              placeholder="e.g. 2.75"
              step="0.1"
              value={ingredient.calories}
              onChange={(e) => handleChange(index, "calories", e.target.value)}
            />
          </div>
        </div>
      ))}

      {/* Button to add a new ingredient */}
      <div className="add-ingredient-wrapper">
        <button
          type="button"
          className="add-ingredient-button"
          onClick={handleAddIngredient}
        >
          ➕ Add Ingredient
        </button>
      </div>
    </div>
  );
};

export default IngredientForm;
