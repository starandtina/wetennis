import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'Mine',
  getComponent (nextState, next) {
    require.ensure([
      './containers/MineContainer'
    ], (require) => {
      const SettingContainer = require('./containers/MineContainer')

      next(null, SettingContainer)
    })
  }
})
