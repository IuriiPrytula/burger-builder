import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-my-burger-5d3a7.firebaseio.com/'
})

export default instance