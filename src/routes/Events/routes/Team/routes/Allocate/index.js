import { injectReducer } from 'store/reducers'
import { requireAuth } from 'utils/auth'

export default (store) => ({
  path: ':teamId/allocate',
  onEnter(nextState) {
    // requireAuth.apply(this, arguments)
  },
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const teamAllocate = require('./containers/TeamAllocate')
      const reducer = require('./modules').default

      injectReducer(store, {
        key: 'teamAllocate',
        reducer,
      })

      next(null, teamAllocate)
    }, 'events')
  }
})
