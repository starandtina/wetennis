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
        require('./routes/Signin')(store),
        require('./routes/Resetpassword')(store),
        require('./routes/Settings')(store),
        require('./routes/Me')(store),
        require('./routes/MyMatch')(store),
        require('./routes/Partner')(store),
        require('./routes/Friend')(store),
      ])
    }, 'dashboard')
  },
  getComponent (nextState, next) {
    require.ensure([
      './containers/DashboardContainer',
      './components/Dashboard',
      './modules/user',
      './modules/settings'
    ], (require) => {
      const Dashboard = require('./containers/DashboardContainer')
      const reducer = require('./modules/user').default
      const settingReducer = require('./modules/settings').default

      injectReducer(store, { key: 'user', reducer });
      injectReducer(store, { key: 'settings', reducer:settingReducer });
      injectReducer(store, { key: 'settings', reducer:settingReducer });

      next(null, Dashboard)
    }, 'dashboard')
  }
})
