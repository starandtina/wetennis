import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'me',
  getComponent (nextState, next) {
    require.ensure([
      './containers/MeContainer'
    ], (require) => {
      const SettingContainer = require('./containers/MeContainer')

      next(null, SettingContainer)
    }, 'dashboard')
  }
})
