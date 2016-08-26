import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'guess',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require("./routes/Event")(store)
      ])
    }, 'guess')
  },

  getComponent (nextState, next) {
    require.ensure([
      "./containers",
      "./modules"
    ], (require) => {
      const Container = require('./containers')
      const reducer = require('./modules').default

      injectReducer(store, { key: 'guess', reducer })

      next(null, Container)
    }, 'guess')
  }
})
