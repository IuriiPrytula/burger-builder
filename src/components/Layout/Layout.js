import React, {Component} from 'react'
import Auxiliary from './../../hoc/Auxiliary'
import classes from './Layout.css'
import Toolbar from './../Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerHandler = () => {
    this.setState({showSideDrawer: true})
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  render() {
    return (
      <Auxiliary>
        <Toolbar showSideDrawer={this.sideDrawerHandler} />
        <SideDrawer 
          open={this.state.showSideDrawer} 
          closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliary>
    )
  }
}

export default Layout
