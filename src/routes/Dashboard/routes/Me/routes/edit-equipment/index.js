export default ({
  path: 'editEqu/:id',
  getComponent(nextState, next) {
    require.ensure(['./containers/EditEquipment'], (require) => {
      const EditEquipmentContainer = require('./containers/EditEquipment');

      next(null, EditEquipmentContainer)
    }, 'dashboard')
  }
})
