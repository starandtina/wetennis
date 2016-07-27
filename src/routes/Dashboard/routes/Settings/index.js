import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'settings',
  getComponent (nextState, next) {
    require.ensure([
      './containers/SettingContainer'
    ], (require) => {
      const SettingContainer = require('./containers/SettingContainer')

      next(null, SettingContainer)
    })
  }
})
