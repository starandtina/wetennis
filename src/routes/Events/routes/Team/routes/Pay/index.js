export default (store) => ({
  path: 'Pay',

  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const Pay = require('./containers/Pay')

      next(null, Pay)
    }, 'events')
  }
})
