import { injectReducer } from '../../store/reducers'
import { requireAuth } from 'utils/auth'

export default (store) => ({
  path: 'dashboard',
  onEnter() {
    requireAuth.apply(this, arguments)
  },
  getComponent (nextState, next) {
    require.ensure([
      './containers/DashboardContainer',
      './components/Dashboard',
      './modules/dashboard'
    ], (require) => {
  /*  These modules are lazily evaluated using require hook, and
      will not loaded until the router invokes this callback. */

      const Dashboard = require('./containers/DashboardContainer')
      const reducer = require('./modules/dashboard').default

      injectReducer(store, { key: 'dashboard', reducer })

      next(null, Dashboard)
    })
  }
})
