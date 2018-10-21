import React, { Component } from "react"
import Auxiliary from "./../../hoc/Auxiliary"
import Burger from "./../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "./../../components/UI/Modal/Modal"
import OrderSummary from "./../../components/Burger/OrderSummary/OrderSummary"

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    this.setState({ purchasable: sum > 0 })
  }

  addIngridientHandler = type => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1

    const updatedingredients = {
      ...this.state.ingredients
    }
    updatedingredients[type] = updatedCount

    const priceAddition = INGRIDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedingredients
    })
    this.updatePurchaseState(updatedingredients)
  }

  removeIngridientHandler = type => {
    const oldCount = this.state.ingredients[type]
    if (oldCount <= 0) return
    const updatedCount = oldCount - 1

    const updatedingredients = {
      ...this.state.ingredients
    }
    updatedingredients[type] = updatedCount

    const priceDeduction = INGRIDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceDeduction

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedingredients
    })
    this.updatePurchaseState(updatedingredients)
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    alert("YOU CONTINUE!")
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingridientAdded={this.addIngridientHandler}
          ingridientRemoved={this.removeIngridientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler}
        />
      </Auxiliary>
    )
  }
}

export default BurgerBuilder
