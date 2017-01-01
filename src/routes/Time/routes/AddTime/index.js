export default (store) => ({
  path: 'addTime',
  getComponent (nextState, next) {
    require.ensure([
      './containers/AddTime'
    ], (require) => {
      const AddTimeContainer = require('./containers/AddTime')

      next(null, AddTimeContainer)
    }, 'time')
  }
})
