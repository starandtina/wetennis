export default {
  path: 'Purchase',

  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const Purchase = require('./containers/Purchase')

      next(null, Purchase)
    }, 'events')
  }
}
