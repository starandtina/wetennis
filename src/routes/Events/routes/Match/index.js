import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: ':eventId/match/:matchId',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
      ])
    }, 'events');
  },

  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const EventMatch = require('./containers/EventMatchContainer')
      const reducer = require('./modules/eventMatch').default

      injectReducer(store, { key: 'eventMatch', reducer })

      next(null, EventMatch)
    }, 'events');
  }
})
