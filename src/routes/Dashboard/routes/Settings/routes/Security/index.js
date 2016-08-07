export default ({
  path: 'security',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const securityContainer = require('./containers/securityContainer');
      next(null, securityContainer)
    })
  }
})