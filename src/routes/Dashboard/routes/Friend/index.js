import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'friend',
  getComponent (nextState, next) {
    require.ensure([
      './containers/Friend'
    ], (require) => {
      const friendContainer = require('./containers/Friend')
      const reducer = require('./modules').default

      injectReducer(store, {
        key: 'friend',
        reducer
      })

      next(null, friendContainer)
    }, 'dashboard')
  }
})
