import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'signup',
  getComponent (nextState, next) {
    require.ensure([
      './containers/SignupContainer',
      './modules/signup'
    ], (require) => {
  /*  These modules are lazily evaluated using require hook, and
      will not loaded until the router invokes this callback. */

      const Signup = require('./containers/SignupContainer').default
      const reducer = require('./modules/signup').default

      injectReducer(store, { key: 'user', reducer })

      next(null, Signup)
    })
  }
})
