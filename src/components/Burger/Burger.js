import React from "react"
import BurgerIngridient from "./BurgerIngridient/BurgerIngridient"
import classes from "./Burger.css"

const burger = props => {
  let transformedIngridients = Object.keys(props.ingridients)
    .map(igKey => {
      return [...Array(props.ingridients[igKey])].map((el, i) => {
        return <BurgerIngridient key={igKey + i} type={igKey} />
      })
    })
    .reduce((prev, next) => {
      return prev.concat(next)
    }, [])

  if (transformedIngridients.length === 0)
    transformedIngridients = "Please start adding ingridients"

  return (
    <div className={classes.Burger}>
      <BurgerIngridient type={"bread-top"} />
      {transformedIngridients}
      <BurgerIngridient type={"bread-bottom"} />
    </div>
  )
}

export default burger
