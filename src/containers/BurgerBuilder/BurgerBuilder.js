import React, {Component} from 'react'
import Auxiliary from './../../hoc/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
  state = {
    ingridients: {
      salad: 1,
      bacon: 1,
      cheese: 2,
      meat: 2
    }
  }


  render() {
    return(
      <Auxiliary>
        <Burger ingridients={this.state.ingridients} />
        <BuildControls />
      </Auxiliary>
    )
  }
}

export default BurgerBuilder