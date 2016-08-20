import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: ':eventId',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [])
    })
  },

  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./containers')
      const reducer = require('./modules').default

      injectReducer(store, { key: 'guessEventInfo', reducer })

      next(null, Container)
    })
  }
})
