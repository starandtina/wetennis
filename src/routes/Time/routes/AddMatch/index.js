export default (store) => ({
  path: 'AddMatch',
  getComponent (nextState, next) {
    require.ensure([
      './containers/AddMatch'
    ], (require) => {
      const AddMatchContainer = require('./containers/AddMatch')

      next(null, AddMatchContainer)
    }, 'time')
  }
})