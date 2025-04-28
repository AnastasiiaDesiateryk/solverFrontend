// src/components/Popup.jsx

import React, { useState } from "react";
import IngredientForm from "./IngredientForm";
import ConstraintForm from "./ConstraintForm";
import AestheticRuleForm from "./AestheticRuleForm";
import ResultDisplay from "./ResultDisplay";
import { validateConstraints, buildRequestBody } from "../utils/helpers";
import "./Popup.css";

const Popup = () => {
  // ✅ Дефолтные данные
  const [ingredients, setIngredients] = useState([
    { name: "Feige", price: 0.025, calories: 2.75 },
    { name: "Schokolade", price: 0.03, calories: 5 },
    { name: "Minze", price: 0.15, calories: 0 },
  ]);
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
  const [aestheticRule, setAestheticRule] = useState({
    ingredient_name: "Minze",
    rule_type: "min",
    percent: 0.1,
  });
  const [goal, setGoal] = useState({
    targetType: "PRICE",
    targetName: "price",
    direction: "MINIMIZE",
  });
  const [totalWeight, setTotalWeight] = useState(30);
  const [allowDeviation, setAllowDeviation] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSolve = async () => {
    const validation = validateConstraints(constraints);
    if (!validation.valid) {
      setError(validation.message);
      return;
    }
    setError("");

    const body = buildRequestBody({
      ingredients,
      constraints,
      aestheticRule,
      goal,
      totalWeight,
      allowDeviation,
    });

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
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult(null);
      setError("Failed to connect to server.");
    }
  };

  return (
    <div className="popup-container">
      <h2>Smart Recipe Optimizer</h2>

      <div className="section">
        <IngredientForm
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      </div>

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

      <div className="section">
        <h3>Optimization Settings</h3>
        <label htmlFor="totalWeight">Total Weight:</label>
        <input
          id="totalWeight"
          type="number"
          value={totalWeight}
          onChange={(e) => setTotalWeight(parseFloat(e.target.value))}
        />

        <label>Goal Target:</label>
        <select
          value={goal.targetType}
          onChange={(e) => setGoal({ ...goal, targetType: e.target.value })}
        >
          <option value="">None</option>
          <option value="PRICE">Price</option>
          <option value="CALORIES">Calories</option>
        </select>

        <label>Goal Direction:</label>
        <select
          value={goal.direction}
          onChange={(e) => setGoal({ ...goal, direction: e.target.value })}
        >
          <option value="MAXIMIZE">Maximize</option>
          <option value="MINIMIZE">Minimize</option>
        </select>

        <label>Allow Deviation:</label>
        <select
          value={allowDeviation ? "true" : "false"}
          onChange={(e) => setAllowDeviation(e.target.value === "true")}
        >
          <option value="false">Strict</option>
          <option value="true">Flexible</option>
        </select>
      </div>

      <div className="section">
        <button onClick={handleSolve}>Solve</button>

        {error && <div className="error-message">{error}</div>}
        {result && <ResultDisplay result={result} />}
      </div>
    </div>
  );
};

export default Popup;
