import { injectReducer } from 'store/reducers'
import { requireAuth } from 'utils/auth'

export default (store) => ({
  path: 'dashboard',
  onEnter (nextState) {
    if (nextState.location.pathname === '/dashboard') {
      requireAuth.apply(this, arguments)
    }
  },
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Signup')(store),
        require('./routes/Signin')(store)
      ])
    })
  },
  getComponent (nextState, next) {
    require.ensure([
      './containers/DashboardContainer',
      './components/Dashboard',
      './modules/user'
    ], (require) => {
      const Dashboard = require('./containers/DashboardContainer')
      const reducer = require('./modules/user').default

      injectReducer(store, { key: 'user', reducer })

      next(null, Dashboard)
    })
  }
})
