import React, { useState } from "react";
import IngredientForm from "./IngredientForm";
import ConstraintForm from "./ConstraintForm";
import AestheticRuleForm from "./AestheticRuleForm";
import ResultDisplay from "./ResultDisplay";
import { validateConstraints, buildRequestBody } from "../utils/helpers";
import "./Popup.css";

// Main Popup component for the Smart Recipe Optimizer Chrome extension
const Popup = () => {
  // State to store default ingredients used in recipe optimization
  const [ingredients, setIngredients] = useState([
    { name: "Feige", price: 0.025, calories: 2.75 },
    { name: "Schokolade", price: 0.03, calories: 5 },
    { name: "Minze", price: 0.15, calories: 0 },
  ]);

  // State to manage constraints applied to ingredients (e.g., calorie limit)
  const [constraints, setConstraints] = useState([
    {
      left: "Schokolade",
      op: "GREATER_THAN_OR_EQUAL",
      right: 15,
      allowDeviation: false,
    },
    {
      left: "calories",
      op: "LESS_THAN_OR_EQUAL",
      right: 100,
      allowDeviation: false,
    },
  ]);

  // State for aesthetic rules (visual or taste-oriented constraints)
  const [aestheticRule, setAestheticRule] = useState({
    ingredient_name: "Minze",
    rule_type: "min",
    percent: 0.1,
  });

  // State for the main optimization goal (e.g., minimize price or calories)
  const [goal, setGoal] = useState({
    targetType: "PRICE",
    targetName: "price",
    direction: "MINIMIZE",
  });

  // State for the total desired weight of the final optimized recipe
  const [totalWeight, setTotalWeight] = useState(30);

  // State indicating if deviations from constraints are allowed
  const [allowDeviation, setAllowDeviation] = useState(false);

  // State to store the optimization result returned by the backend API
  const [result, setResult] = useState(null);

  // State for error messages (validation or server issues)
  const [error, setError] = useState("");

  // Function to handle the optimization request upon user action
  const handleSolve = async () => {
    // Validate constraints before sending request
    const validation = validateConstraints(constraints);
    if (!validation.valid) {
      setError(validation.message);
      return;
    }
    setError("");

    // Prepare request payload based on current states
    const body = buildRequestBody({
      ingredients,
      constraints,
      aestheticRule,
      goal,
      totalWeight,
      allowDeviation,
    });

    // Send optimization request to backend API
    try {
      const response = await fetch(
        "https://dessertsolverbackend.onrender.com",
        {
          // const response = await fetch("http://localhost:8080/solve-dessert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      // Parse JSON response from backend
      const data = await response.json();
      // Update result state to display optimization results
      setResult(data);
    } catch (err) {
      setResult(null);
      setError("Failed to connect to server.");
    }
  };

  return (
    <div className="popup-container">
      <h2>Smart Recipe Optimizer</h2>

      {/* Section for managing ingredients */}
      <div className="section">
        <IngredientForm
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      </div>

      {/* Section for defining constraints (e.g., minimum or maximum amounts) */}
      <div className="section">
        <ConstraintForm
          constraints={constraints}
          setConstraints={setConstraints}
          ingredients={ingredients}
        />
      </div>

      <div className="section">
        <AestheticRuleForm
          aestheticRule={aestheticRule}
          setAestheticRule={setAestheticRule}
          ingredients={ingredients}
        />
      </div>

      {/* Section for general optimization settings */}
      <div className="section">
        <h3>Optimization Settings</h3>

        {/* Input for total weight of recipe */}
        <label htmlFor="totalWeight">Total Weight:</label>
        <input
          id="totalWeight"
          type="number"
          value={totalWeight}
          onChange={(e) => setTotalWeight(parseFloat(e.target.value))}
        />
        {/* Dropdown to select optimization target (price/calories) */}
        <label>Goal Target:</label>
        <select
          value={goal.targetType}
          onChange={(e) => setGoal({ ...goal, targetType: e.target.value })}
        >
          <option value="">None</option>
          <option value="PRICE">Price</option>
          <option value="CALORIES">Calories</option>
        </select>

        {/* Dropdown to select optimization direction (maximize/minimize) */}
        <label>Goal Direction:</label>
        <select
          value={goal.direction}
          onChange={(e) => setGoal({ ...goal, direction: e.target.value })}
        >
          <option value="MAXIMIZE">Maximize</option>
          <option value="MINIMIZE">Minimize</option>
        </select>

        {/* Allow deviation from constraints or strictly enforce them */}
        <label>Allow Deviation:</label>
        <select
          value={allowDeviation ? "true" : "false"}
          onChange={(e) => setAllowDeviation(e.target.value === "true")}
        >
          <option value="false">Strict</option>
          <option value="true">Flexible</option>
        </select>
      </div>

      {/* Section to trigger optimization and display results or errors */}
      <div className="section">
        <button onClick={handleSolve}>Solve</button>

        {/* Display validation or connection errors */}
        {error && <div className="error-message">{error}</div>}

        {/* Display the optimization results */}
        {result && <ResultDisplay result={result} />}
      </div>
    </div>
  );
};

export default Popup;
