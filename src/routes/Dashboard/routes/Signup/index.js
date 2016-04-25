import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'signup',
  getComponent (nextState, next) {
    require.ensure([
      './containers/SignupContainer'
    ], (require) => {
      const Signup = require('./containers/SignupContainer').default

      next(null, Signup)
    })
  }
})
