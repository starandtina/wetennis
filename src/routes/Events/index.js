import { injectReducer } from '../../store/reducers'
import { requireAuth } from 'utils/auth'

export default (store) => ({
  path: 'events',
  onEnter() {
    // requireAuth.apply(this, arguments)
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Register')(store),
        require('./routes/Details')(store),
        require('./routes/DrawTable')(store),
      ])
    })
  },
  getComponent (nextState, next) {
    require.ensure([
      './containers/EventContainer',
      './components/EventList',
      './modules'
    ], (require) => {
  /*  These modules are lazily evaluated using require hook, and
      will not loaded until the router invokes this callback. */

      const Container = require('./containers/EventContainer')
      const reducer = require('./modules')

      injectReducer(store, { key: 'events', reducer })

      next(null, Container)
    })
  }
})
