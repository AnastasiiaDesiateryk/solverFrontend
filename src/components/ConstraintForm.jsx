// src/components/ConstraintForm.jsx

import React from "react";
import "./ConstraintForm.css";

const ConstraintForm = ({ constraints, setConstraints, ingredients }) => {
  const handleAddConstraint = () => {
    setConstraints([
      ...constraints,
      { left: "", op: ">=", right: "", allow_deviation: false },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...constraints];
    if (field === "allow_deviation") {
      updated[index][field] = value;
    } else if (field === "right") {
      updated[index][field] = parseFloat(value) || 0;
    } else {
      updated[index][field] = value;
    }
    setConstraints(updated);
  };

  const handleRemoveConstraint = (index) => {
    const updatedConstraints = [...constraints];
    updatedConstraints.splice(index, 1);
    setConstraints(updatedConstraints);
  };

  return (
    <div className="constraint-form">
      <h3 className="section-title">Additional Constraints</h3>

      {constraints.map((constraint, index) => (
        <div key={index} className="constraint-card">
          <div className="constraint-header">
            {/* <h4 className="constraint-title">Constraint {index + 1}</h4> */}

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
                alignItems: "right",
                justifyContent: "right",
                borderRadius: "50%",
                flexShrink: 0,
                overflow: "hidden",
                boxSizing: "border-box",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onClick={() => handleRemoveConstraint(index)}
            >
              ✖️
            </button>
          </div>

          <div className="form-group">
            <select
              value={constraint.left}
              onChange={(e) => handleChange(index, "left", e.target.value)}
            >
              <option value="">Select field</option>
              {ingredients.map((ingredient, i) => (
                <option key={i} value={ingredient.name}>
                  {ingredient.name}
                </option>
              ))}
              <option value="price">Price</option>
              <option value="calories">Calories</option>
              <option value="weight">Weight</option>
            </select>
          </div>

          <div className="form-group">
            <select
              value={constraint.op}
              onChange={(e) => handleChange(index, "op", e.target.value)}
            >
              <option value=">=">&ge;</option>
              <option value="<=">&le;</option>
              <option value="==">=</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="number"
              placeholder="Value"
              step="0.1"
              value={constraint.right}
              onChange={(e) => handleChange(index, "right", e.target.value)}
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={
                  constraint.allowDeviation || constraint.allow_deviation
                }
                onChange={(e) =>
                  handleChange(index, "allowDeviation", e.target.checked)
                }
              />
              Allow deviation (±10%)
            </label>
          </div>
        </div>
      ))}

      <div className="add-constraint-wrapper">
        <button
          type="button"
          className="add-constraint-button"
          onClick={handleAddConstraint}
        >
          ➕ Add Constraint
        </button>
      </div>
    </div>
  );
};

export default ConstraintForm;
