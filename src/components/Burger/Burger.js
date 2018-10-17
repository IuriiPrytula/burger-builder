import React from "react"
import BurgerIngridient from "./BurgerIngridient/BurgerIngridient"
import classes from "./Burger.css"

const burger = props => {
  let transformedingredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((el, i) => {
        return <BurgerIngridient key={igKey + i} type={igKey} />
      })
    })
    .reduce((prev, next) => {
      return prev.concat(next)
    }, [])

  if (transformedingredients.length === 0)
    transformedingredients = "Please start adding ingredients"

  return (
    <div className={classes.Burger}>
      <BurgerIngridient type={"bread-top"} />
      {transformedingredients}
      <BurgerIngridient type={"bread-bottom"} />
    </div>
  )
}

export default burger
