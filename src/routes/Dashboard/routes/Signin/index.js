import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'signin',
  getComponent (nextState, next) {
    require.ensure([
      './containers/SigninContainer'
    ], (require) => {
      const Signin = require('./containers/SigninContainer')

      next(null, Signin)
    }, 'dashboard')
  }
})
