// src/components/AestheticRuleForm.jsx

import React from "react";
import "./AestheticRuleForm.css";

const AestheticRuleForm = ({
  aestheticRule,
  setAestheticRule,
  ingredients,
}) => {
  const handleChange = (field, value) => {
    setAestheticRule((prev) => ({
      ...prev,
      [field]: field === "percent" ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div className="aesthetic-rule-form">
      <h3 className="section-title">Special Ingredient Setting</h3>

      <div className="form-group">
        <label htmlFor="aestheticIngredient">Choose Ingredient:</label>
        <p className="section-subtitle">
          Specify the minimum or maximum percentage of an ingredient in your
          recipe.
        </p>
        <select
          id="aestheticIngredient"
          value={aestheticRule?.ingredient_name || ""}
          onChange={(e) => handleChange("ingredient_name", e.target.value)}
        >
          <option value="">Select ingredient</option>
          {ingredients.map((ingredient, index) => (
            <option key={index} value={ingredient.name}>
              {ingredient.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="ruleType">Rule Type:</label>
        <select
          id="ruleType"
          value={aestheticRule.rule_type}
          onChange={(e) => handleChange("rule_type", e.target.value)}
        >
          <option value="min">At least</option>
          <option value="max">At most</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="percent">Percentage:</label>
        <input
          id="percent"
          type="number"
          step="0.01"
          placeholder="e.g. 0.3 for 30%"
          value={aestheticRule.percent || ""}
          onChange={(e) => handleChange("percent", e.target.value)}
        />
      </div>
    </div>
  );
};

export default AestheticRuleForm;
