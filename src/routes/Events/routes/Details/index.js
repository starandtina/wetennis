import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: ':eventId',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // require('./routes/Confirmation')
      ])
    }, 'events')
  },

  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const EventDetails = require('./containers/EventDetailsContainer')
      const reducer = require('./modules/eventDetails').default

      injectReducer(store, { key: 'eventDetails', reducer })

      next(null, EventDetails)
    })
  }
})
