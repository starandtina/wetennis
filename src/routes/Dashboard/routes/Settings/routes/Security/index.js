export default ({
  path: 'security',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const securityContainer = require('./containers/SecurityContainer');
      next(null, securityContainer)
    }, 'dashboard')
  }
})
