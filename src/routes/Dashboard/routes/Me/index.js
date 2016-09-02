import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'me',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/add-equipment'),
        require('./routes/edit-equipment'),
        require('./routes/edit-background-image')
      ])
    }, 'dashboard')
  },
  getComponent (nextState, next) {
    require.ensure([
      './containers/MeContainer'
    ], (require) => {
      const SettingContainer = require('./containers/MeContainer')

      next(null, SettingContainer)
    }, 'dashboard')
  }
})
