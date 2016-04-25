import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'signin',
  getComponent (nextState, next) {
    require.ensure([
      './containers/SigninContainer',
      './modules/signin'
    ], (require) => {
      const Signup = require('./containers/SigninContainer').default
      const reducer = require('./modules/signin').default

      next(null, Signup)
    })
  }
})
