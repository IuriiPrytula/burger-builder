import React, { Component } from "react"
import Auxiliary from "./../../hoc/Auxiliary"
import Burger from "./../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "./../../components/UI/Modal/Modal"
import OrderSummary from "./../../components/Burger/OrderSummary/OrderSummary"
import axios from "../../axios-orders"
import Spinner from "./../../components/UI/Spinner/Spinner"
import withErrorHandler from "./../../hoc/withErrorHandler/withErrorHandler"

const INGRIDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  componentDidMount() {
    axios
      .get("https://react-my-burger-5d3a7.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data })
      })
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

  addIngredientHandler = type => {
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

  removeIngredientHandler = type => {
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
    const queryParams = []
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price=' + this.state.totalPrice)
    const queryString = queryParams.join("&")
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    })
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null
    let burger = <Spinner />
    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Auxiliary>
      )

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      )
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)
