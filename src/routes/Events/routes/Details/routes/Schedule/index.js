import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'Schedule',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [])
    }, 'events')
  },

  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./containers')
      const reducer = require('./modules').default

      injectReducer(store, { key: 'eventSchedule', reducer })

      next(null, Container)
    }, 'events')
  }
})
