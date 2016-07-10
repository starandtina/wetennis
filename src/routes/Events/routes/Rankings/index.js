import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: ':eventId/Rankings',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [])
    })
  },

  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./containers')
      const reducer = require('./modules').default

      injectReducer(store, { key: 'eventRankings', reducer })

      next(null, Container)
    })
  }
})
