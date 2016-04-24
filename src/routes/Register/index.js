import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'register/:eventId',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Confirmation')
      ])
    })
  },

  getComponent (nextState, next) {
    require.ensure([], (require) => {
  /*  These modules are lazily evaluated using require hook, and
      will not loaded until the router invokes this callback. */

      const Register = require('./containers/RegisterContainer')
      const reducer = require('./modules/register').default

      injectReducer(store, { key: 'register', reducer })

      next(null, Register)
    })
  }
})
