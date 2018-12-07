import React from "react";
import classes from "./Order.css";

const order = props => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    if (props.ingredients[ingredientName] === 0)
      continue
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  return (
    <div className={classes.Order}>
      <p>Ingredients:</p>
      <ul>
        {ingredients.map(ingredient => (
          <li key={ingredient.name}>
            <p>
              {ingredient.name}: <strong>{ingredient.amount}</strong>
            </p>
          </li>
        ))}
      </ul>
      <p>
        Price: <strong>{props.price}</strong>
      </p>
    </div>
  );
};

export default order;
