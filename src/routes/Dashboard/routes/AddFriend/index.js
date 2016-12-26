import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'addFriend',
  getComponent (nextState, next) {
    require.ensure([
      './containers/AddFriend'
    ], (require) => {
      const addFriendContainer = require('./containers/AddFriend')
      const reducer = require('./modules').default

      injectReducer(store, {
        key: 'addFriend',
        reducer,
      })

      next(null, addFriendContainer)
    }, 'dashboard')
  }
})
