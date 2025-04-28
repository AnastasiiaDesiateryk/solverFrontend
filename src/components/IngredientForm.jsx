import React from "react";
import "./IngredientForm.css";

const IngredientForm = ({ ingredients, setIngredients }) => {
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", price: "", calories: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = field === "name" ? value : parseFloat(value) || 0;
    setIngredients(updated);
  };
  const handleRemoveIngredient = (index) => {
    const updated = [...ingredients];
    updated.splice(index, 1);
    setIngredients(updated);
  };

  return (
    <div className="ingredient-form">
      <h3 className="section-title">Ingredients</h3>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="ingredient-card">
          <div className="ingredient-header">
            <h4 className="ingredient-title">
              Ingredient {String.fromCharCode(65 + index)}
            </h4>

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

          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Name"
              value={ingredient.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
          </div>

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
