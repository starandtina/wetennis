import {
  injectReducer
} from 'store/reducers'

import {
  requireAuth
} from 'utils/auth'

export default (store) => ({
  path: 'register',
  onEnter(nextState) {
    requireAuth.apply(this, arguments)
  },
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const Register = require('./containers/TeamRegister')
      const reducer = require('./modules')

      injectReducer(store, {
        key: 'register',
        reducer
      })

      next(null, Register)
    }, 'events')
  }
})
