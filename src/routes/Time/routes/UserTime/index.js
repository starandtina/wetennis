export default (store) => ({
  path: 'users/:userId',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/AddMatch')(store),
        require('./routes/AddTime')(store)
      ])
    }, 'time')
  },
  getComponent (nextState, next) {
    require.ensure([
      './containers/UserTime'
    ], (require) => {
      const UserTimeContainer = require('./containers/UserTime')

      next(null, UserTimeContainer)
    }, 'time')
  }
})