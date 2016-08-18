export default {
  path: 'confirmation',

  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const RegisterConfirmation = require('./containers/RegisterConfirmation')

      next(null, RegisterConfirmation)
    }, 'events')
  }
}
