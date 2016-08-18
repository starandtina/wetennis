export default ({
  path: 'address',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const addressContainer = require('./containers/addressContainer');
      next(null, addressContainer)
    }, 'dashboard')
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/edit'),
      ])
    })
  },
})
