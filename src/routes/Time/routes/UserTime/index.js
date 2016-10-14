export default (store) => ({
  path: ':userId',
  getComponent (nextState, next) {
    require.ensure([
      './containers/UserTime'
    ], (require) => {
      const UserTimeContainer = require('./containers/UserTime')

      next(null, UserTimeContainer)
    }, 'time')
  }
})