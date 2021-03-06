import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'registeredTeams',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [])
    }, 'events')
  },

  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./containers/RegisteredTeamsContainer')
      const reducer = require('./modules').default

      injectReducer(store, { key: 'eventRegisteredTeams', reducer })

      next(null, Container)
    }, 'events')
  }
})
