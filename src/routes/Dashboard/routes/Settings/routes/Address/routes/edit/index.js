export default ({
  path: ':id',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const AddressEditContainer = require('./containers/AddressEdit');
      next(null, AddressEditContainer)
    })
  }
})
