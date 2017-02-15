import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'registeredMembers',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [])
    }, 'events')
  },

  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./containers/RegisteredMembersContainer')
      const reducer = require('./modules').default

      injectReducer(store, { key: 'eventRegisteredMembers', reducer })

      next(null, Container)
    }, 'events')
  }
})
