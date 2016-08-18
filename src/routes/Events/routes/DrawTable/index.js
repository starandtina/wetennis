import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: ':eventId/drawTable',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [])
    }, 'events')
  },

  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./containers/drawTableContainer')
      const reducer = require('./modules/drawTable').default

      injectReducer(store, { key: 'drawTable', reducer })

      next(null, Container)
    }, 'events')
  }
})
