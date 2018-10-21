import React from "react"
import Auxiliary from "./../../../hoc/Auxiliary"
import Button from "../../UI/Button/Button"

const orderSummary = props => {
  const ingridientsSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
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
      <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Auxiliary>
  )
}

export default orderSummary