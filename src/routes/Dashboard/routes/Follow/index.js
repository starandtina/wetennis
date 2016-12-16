import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'follow',
  getComponent (nextState, next) {
    require.ensure([
      './containers/Follow'
    ], (require) => {
      const followContainer = require('./containers/Follow')
      const reducer = require('./modules').default

      injectReducer(store, {
        key: 'follow',
        reducer
      })

      next(null, followContainer)
    }, 'dashboard')
  }
})
