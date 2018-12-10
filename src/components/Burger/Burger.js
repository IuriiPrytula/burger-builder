import React from "react"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"
import classes from "./Burger.css"

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((el, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />
      })
    })
    .reduce((prev, next) => {
      return prev.concat(next)
    }, [])

  if (transformedIngredients.length === 0)
    transformedIngredients = "Please start adding ingredients"

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={"bread-top"} />
      {transformedIngredients}
      <BurgerIngredient type={"bread-bottom"} />
    </div>
  )
}

export default burger
