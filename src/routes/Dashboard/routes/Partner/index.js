import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'partner',
  getComponent (nextState, next) {
    require.ensure([
      './containers/Partner'
    ], (require) => {
      const partnerContainer = require('./containers/Partner')
      const reducer = require('./modules').default

      injectReducer(store, {
        key: 'partner',
        reducer
      })

      next(null, partnerContainer)
    }, 'dashboard')
  }
})
