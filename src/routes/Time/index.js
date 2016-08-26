import { injectReducer } from 'store/reducers'
import { requireAuth } from 'utils/auth'

export default (store) => ({
  path: 'time',
  onEnter (nextState) {
      requireAuth.apply(this, arguments)
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
      const timeReducer = require('./reducers')

      injectReducer(store, { key: 'time', reducer:timeReducer });

      next(null, Time)
    }, 'time')
  }
})
