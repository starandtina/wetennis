import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'signup',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/VerifyPhone')
      ])
    }, 'dashboard')
  },
  getComponent (nextState, next) {
    require.ensure([
      './containers/SignupContainer'
    ], (require) => {
      const Signup = require('./containers/SignupContainer')

      next(null, Signup)
    }, 'dashboard')
  }
})
