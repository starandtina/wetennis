import { injectReducer } from 'store/reducers'
import { requireAuth } from 'utils/auth'

export default (store) => ({
  path: 'time',
  onEnter (nextState) {
    if (nextState.location.pathname === '/dashboard') {
      //requireAuth.apply(this, arguments)
    }
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/AddMatch')(store),
        require('./routes/AddTime')(store)
      ])
    }, 'time')
  },
  getComponent (nextState, next) {
    require.ensure([
      './containers/TimeContainer'
    ], (require) => {
      const Time = require('./containers/TimeContainer')
      //const reducer = require('./modules/user').default
      const timeReducer = require('./reducers')

      //injectReducer(store, { key: 'user', reducer });
      injectReducer(store, { key: 'time', reducer:timeReducer });

      next(null, Time)
    }, 'time')
  }
})
