import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'Me',
  getComponent (nextState, next) {
    require.ensure([
      './containers/MeContainer'
    ], (require) => {
      const SettingContainer = require('./containers/MeContainer')

      next(null, SettingContainer)
    })
  }
})
