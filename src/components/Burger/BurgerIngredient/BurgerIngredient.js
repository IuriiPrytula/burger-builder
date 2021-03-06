import React, { Component } from 'react'
import classes from './BurgerIngredient.css'
import propTypes from 'prop-types'
class BurgerIngredient extends Component {
  render() {
    let ingridient = null

    switch (this.props.type) {
      case "bread-bottom":
        ingridient = <div className={classes.BreadBottom}></div>
        break
      case "bread-top":
        ingridient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1} />
            <div className={classes.Seeds2} />
          </div>
        )
        break
      case "meat":
        ingridient = <div className={classes.Meat} />
        break
      case "cheese":
        ingridient = <div className={classes.Cheese} />
        break
      case "bacon":
        ingridient = <div className={classes.Bacon} />
        break
      case "salad":
        ingridient = <div className={classes.Salad} />
        break
      default:
        ingridient = null
        break
    }

    return ingridient
  }
}

BurgerIngredient.propTypes = {
  type: propTypes.string.isRequired
}

export default BurgerIngredient