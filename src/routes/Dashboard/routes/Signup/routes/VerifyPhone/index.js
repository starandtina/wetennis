export default {
  path: 'verifyPhone',
  getComponent(nextState, next) {
    require.ensure([
      './containers/VerifyPhoneContainer'
    ], (require) => {
      const Signin = require('./containers/VerifyPhoneContainer')

      next(null, Signin)
    }, 'dashboard')
  }
}
