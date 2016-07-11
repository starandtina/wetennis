import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'resetPassword',
  getComponent (nextState, next) {
    require.ensure([
      './containers/ResetPasswordContainer'
    ], (require) => {
      const ResetPassword = require('./containers/ResetPasswordContainer')

      next(null, ResetPassword)
    })
  }
})
