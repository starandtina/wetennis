import { requireAuth, getCookie } from 'utils/auth'
export default (store) => ({
  path: 'users/:userId',
  onEnter (nextState, replace) {
    const { params : { userId } } = nextState;
    if(userId == "undefined" || userId === getCookie()) {
      requireAuth.apply(this, [{
        location: {
          pathname: "/time"
        }
      }, replace])
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
      './containers/UserTime'
    ], (require) => {
      const UserTimeContainer = require('./containers/UserTime')

      next(null, UserTimeContainer)
    }, 'time')
  }
})