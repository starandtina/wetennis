import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'time',
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/UserTime')(store)
      ])
    }, 'time')
  },
  getComponent (nextState, next) {
    require.ensure([
      './containers/TimeContainer'
    ], (require) => {
      const Time = require('./containers/TimeContainer')
      const timeReducer = require('./reducers')

      injectReducer(store, { key: 'time', reducer:timeReducer });

      next(null, Time)
    }, 'time')
  }
})
