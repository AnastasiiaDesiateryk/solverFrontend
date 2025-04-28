import React from "react";
import "./AestheticRuleForm.css";

// AestheticRuleForm component allows users to set special rules for ingredients,
// such as defining the minimum or maximum percentage of an ingredient in the recipe.
const AestheticRuleForm = ({
  aestheticRule, // Current aesthetic rule (minimum or maximum percentage of ingredient)
  setAestheticRule, // Function to update the aesthetic rule state
  ingredients, // List of available ingredients for selection
}) => {
  // Handle changes to input fields and update the state accordingly.
  // If the field is 'percent', ensure the value is parsed as a float.
  const handleChange = (field, value) => {
    setAestheticRule((prev) => ({
      ...prev,
      [field]: field === "percent" ? parseFloat(value) || 0 : value, // Ensure percentage is a number or default to 0
    }));
  };

  return (
    <div className="aesthetic-rule-form">
      <h3 className="section-title">Special Ingredient Setting</h3>

      {/* Ingredient selection dropdown */}
      <div className="form-group">
        <label htmlFor="aestheticIngredient">Choose Ingredient:</label>
        <p className="section-subtitle">
          Specify the minimum or maximum percentage of an ingredient in your
          recipe.
        </p>
        <select
          id="aestheticIngredient"
          value={aestheticRule?.ingredient_name || ""}
          onChange={(e) => handleChange("ingredient_name", e.target.value)} // Update the selected ingredient
        >
          <option value="">Select ingredient</option>
          {/* Map through available ingredients to display in the dropdown */}
          {ingredients.map((ingredient, index) => (
            <option key={index} value={ingredient.name}>
              {ingredient.name} {/* Display ingredient names */}
            </option>
          ))}
        </select>
      </div>

      {/* Rule type selection (minimum or maximum percentage) */}
      <div className="form-group">
        <label htmlFor="ruleType">Rule Type:</label>
        <select
          id="ruleType"
          value={aestheticRule.rule_type}
          onChange={(e) => handleChange("rule_type", e.target.value)} // Update the rule type
        >
          <option value="min">At least</option>
          <option value="max">At most</option>
        </select>
      </div>

      {/* Input for percentage value */}
      <div className="form-group">
        <label htmlFor="percent">Percentage:</label>
        <input
          id="percent"
          type="number"
          step="0.01"
          placeholder="e.g. 0.3 for 30%" // Example value placeholder
          value={aestheticRule.percent || ""} // Ensure it shows the correct percentage
          onChange={(e) => handleChange("percent", e.target.value)} // Update the percentage value
        />
      </div>
    </div>
  );
};

export default AestheticRuleForm;
