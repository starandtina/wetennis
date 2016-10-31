import { injectReducer } from 'store/reducers'


export default (store) => ({
  path: ':rankId',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [])
    }, 'rankings')
  },

  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./containers')
      const reducer = require('./modules').default

      injectReducer(store, { key: 'rankingDetails', reducer })

      next(null, Container)
    }, 'rankings')
  }
})
