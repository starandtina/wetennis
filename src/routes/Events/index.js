import { injectReducer } from '../../store/reducers'
import { requireAuth } from 'utils/auth'

export default (store) => ({
  path: 'events',
  onEnter() {
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Register')(store),
        require('./routes/Details')(store),
      ])
    }, 'events')
  },
  getComponent (nextState, next) {
    require.ensure([
      './containers/EventContainer',
      './components/EventList',
      './modules'
    ], (require) => {
      const Container = require('./containers/EventContainer')
      const reducer = require('./modules')

      injectReducer(store, { key: 'events', reducer })

      next(null, Container)
    }, 'events')
  }
})
