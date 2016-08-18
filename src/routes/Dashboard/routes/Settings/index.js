import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'settings',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/TechRank'),
        require('./routes/Security'),
        require('./routes/Address'),
      ])
    }, 'dashboard')
  },
  getComponent (nextState, next) {
    require.ensure([
      './containers/SettingContainer'
    ], (require) => {
      const SettingContainer = require('./containers/SettingContainer')

      next(null, SettingContainer)
    })
  }
})
