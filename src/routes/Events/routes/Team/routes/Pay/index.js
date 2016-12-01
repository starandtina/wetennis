export default (store) => ({
  path: ':teamId/pay',

  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const Pay = require('./containers/Pay')

      next(null, Pay)
    }, 'events')
  }
})
