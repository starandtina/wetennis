import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'betting/:eventId',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [])
    }, 'guess')
  },

  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./containers')
      const reducer = require('./modules').default

      injectReducer(store, { key: 'guessBetting', reducer })

      next(null, Container)
    }, 'guess')
  }
})
