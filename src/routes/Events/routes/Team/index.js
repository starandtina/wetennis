import {
  injectReducer
} from 'store/reducers'

import {
  requireAuth
} from 'utils/auth'

export default (store) => ({
  path: ':eventId/team',
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
         require('./routes/Register')(store),
         require('./routes/Pay')(store),
      ])
    }, 'events')
  },
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const Register = require('./containers/Team')
      const reducer = require('./modules').default

      injectReducer(store, {
        key: 'team',
        reducer
      })

      next(null, Register)
    }, 'events')
  }
})
