import React from "react"
import Auxiliary from "./../../../hoc/Auxiliary"

const orderSummary = props => {
  const ingridientsSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    )
  })

  return (
    <Auxiliary>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingridients:</p>
      <ul>{ingridientsSummary}</ul>
      <p>Continue to Checkout?</p>
    </Auxiliary>
  )
}

export default orderSummary
