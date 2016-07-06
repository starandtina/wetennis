import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: ':eventId/register',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Confirmation'),
        require('./routes/Announcement'),
        require('./routes/Purchase')
      ])
    })
  },

  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Register = require('./containers/RegisterContainer')
      const reducer = require('./modules/register').default

      injectReducer(store, { key: 'register', reducer })

      next(null, Register)
    })
  }
})
