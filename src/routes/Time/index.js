import { injectReducer } from 'store/reducers'
import { requireAuth, getCookie } from 'utils/auth'

export default (store) => ({
  path: 'time',
  onEnter(nextState, replace) {
    const {
      params: {
        userId,
      }
    } = nextState

    if (userId == 'undefined' || userId === getCookie()) {
      requireAuth.apply(this, arguments)
    }
  },
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/AddMatch')(store),
        require('./routes/AddTime')(store),
      ])
    }, 'time')
  },
  getComponent(nextState, next) {
    require.ensure([
      './containers/Time'
    ], (require) => {
      const TimeContainer = require('./containers/Time')
      const timeReducer = require('./modules').default

      injectReducer(store, {
        key: 'time',
        reducer: timeReducer
      })

      next(null, TimeContainer)
    }, 'time')
  }
})
