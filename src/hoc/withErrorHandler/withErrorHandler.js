import React, { Component } from "react"
import Modal from "../../components/UI/Modal/Modal"
import Auxiliary from "./../Auxiliary"

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentWillMount() {
      axios.interceptors.request.use(req => {
        this.reqInterceptor = this.setState({
          error: null
        })
        return req
      })
      axios.interceptors.response.use(
        res => res,
        error => {
          this.resInterceptor = this.setState({
            error: error
          })
        }
      )
    }

    componentWillUnmount() {
      // THIS IS FOR TESTS
      console.log('WILL UNMOUNT', this.reqInterceptor, this.resInterceptor)
      ////////////////////
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.request.eject(this.resInterceptor)
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null })
    }

    render() {
      return (
        <Auxiliary>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliary>
      )
    }
  }
}

export default withErrorHandler
