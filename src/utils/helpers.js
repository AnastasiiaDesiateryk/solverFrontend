// src/utils/helpers.js

export function validateConstraints(constraints) {
  const map = {};

  for (const c of constraints) {
    const key = c.left.toLowerCase();

    if (!map[key]) {
      map[key] = { min: -Infinity, max: Infinity };
    }

    switch (c.op) {
      case "GREATER_THAN_OR_EQUAL":
        map[key].min = Math.max(map[key].min, c.right);
        break;
      case "LESS_THAN_OR_EQUAL":
        map[key].max = Math.min(map[key].max, c.right);
        break;
      case "EQUALS":
        map[key].min = map[key].max = c.right;
        break;
      default:
        break;
    }

    if (map[key].min > map[key].max) {
      return {
        valid: false,
        message: `❗ Conflicting constraints for "${c.left}": min ${map[key].min} > max ${map[key].max}`,
      };
    }
  }

  return { valid: true };
}

export function buildRequestBody({
  ingredients,
  constraints,
  aestheticRule,
  goal,
  totalWeight,
  allowDeviation,
}) {
  // Маппинг операторов в формат Java Enum
  const opMap = {
    ">=": "GREATER_THAN_OR_EQUAL",
    "<=": "LESS_THAN_OR_EQUAL",
    ">": "GREATER_THAN",
    "<": "LESS_THAN",
    "==": "EQUALS",
  };

  // Переводим операторы
  const updatedConstraints = [...constraints].map((c) => ({
    left: c.left,
    op: opMap[c.op] || c.op,
    right: c.right,
    allowDeviation:
      c.allow_deviation !== undefined
        ? c.allow_deviation
        : c.allowDeviation || false,
  }));

  // Проверяем, есть ли ограничение по весу
  const hasWeightConstraint = updatedConstraints.some(
    (c) => c.left === "weight"
  );

  if (!hasWeightConstraint && totalWeight > 0) {
    updatedConstraints.push({
      left: "weight",
      op: "EQUALS",
      right: totalWeight,
      allowDeviation: allowDeviation,
    });
  }

  return {
    ingredients,
    constraintsBlock: {
      // 🛠 правильное название
      totalWeight,
      maxPrice: 9999,
      maxCalories: 9999,
      constraints: updatedConstraints,
    },
    goal: goal.targetType
      ? {
          targetType: goal.targetType,
          targetName: goal.targetName,
          direction: goal.direction,
        }
      : null,
    aestheticConstraint: {
      // 🛠 правильное название
      ingredientName: aestheticRule.ingredient_name,
      ruleType: aestheticRule.rule_type,
      percent: aestheticRule.percent,
    },
  };
}
