import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'infomation',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [])
    }, 'events')
  },

  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Container = require('./containers/Infomation')
      const reducer = require('./modules/Infomation').default

      injectReducer(store, { key: 'EventInfomation', reducer })

      next(null, Container)
    }, 'events')
  }
})
