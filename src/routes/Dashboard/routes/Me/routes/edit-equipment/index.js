export default ({
  path: 'editEqu/:id',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const EditEquipmentContainer = require('./containers/EditEquipment');
      next(null, EditEquipmentContainer)
    }, 'dashboard')
  }
})
