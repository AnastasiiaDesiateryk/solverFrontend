import React from "react";
import "./ResultDisplay.css";

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  const { ingredientsQuantities, price, totalWeight, totalCalories, status } =
    result;

  return (
    <div className="result-display">
      <h3 className="result-display-title">Custom Recipe</h3>

      <div className="glass-card">
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Total Weight:</strong> {totalWeight} g
        </p>
        <p>
          <strong>Total Calories:</strong> {totalCalories}
        </p>
        <p>
          <strong>Price:</strong> {price.toFixed(2)} CHF
        </p>

        <h4>Ingredients:</h4>
        <ul>
          {Object.entries(ingredientsQuantities).map(([name, grams], index) => (
            <li key={index}>
              {name}: <strong>{grams.toFixed(2)} g</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultDisplay;
