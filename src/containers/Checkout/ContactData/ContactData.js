import  React, { Component } from "react"
import Button from "../../../components/UI/Button/Button"
import classes from "./ContactData.css"
import axios from "./../../../axios-orders"
import Spinner from "./../../../components/UI/Spinner/Spinner"

class ContactData extends Component{
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice.toFixed(2),
      customer: {
        name: "Iurii",
        address: {
          street: "Teststreet 1",
          zipCode: "789456",
          country: "Poland"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    }

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false, purchasing: false })
        this.props.history.push("/")
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false })
      })
  }

  render() {
    let form = (
      <form className={classes.Form}>
        <input className={classes.Input} type="text" name="name" placeholder="Yor Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Yor Email" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
        <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
      </form>
    )
    if (this.state.loading) {
      form = <Spinner/>
    }

    return(
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData