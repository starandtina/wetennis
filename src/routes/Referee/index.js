import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'referee',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const reducer = require('./modules/referee').default

      injectReducer(store, { key: 'referee', reducer })

      next(null, require('./containers/RefereeContainer'))
    }, 'Referee')
  }
})
