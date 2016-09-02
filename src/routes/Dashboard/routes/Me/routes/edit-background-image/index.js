export default ({
  path: 'editBG',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const EditBGContainer = require('./containers/EditBG');
      next(null, EditBGContainer)
    }, 'dashboard')
  }
})
