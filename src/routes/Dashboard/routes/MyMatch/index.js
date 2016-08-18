import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'myMatch',
  getComponent (nextState, next) {
    require.ensure([
      './containers/MyMatchContainer'
    ], (require) => {
      const MyMatch = require('./containers/MyMatchContainer')
      const MyMatchreducer = require('./reducer')
      injectReducer(store, { key: 'MyMatch', reducer: MyMatchreducer });
      console.log(MyMatchreducer);
      next(null, MyMatch)
    }, 'dashboard')
  }
})
