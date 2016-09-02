export default ({
  path: 'addEqu',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const AddEquipmentContainer = require('./containers/AddEquipment');
      next(null, AddEquipmentContainer)
    }, 'dashboard')
  }
})
