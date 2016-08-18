import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'rankings',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require("./routes/Details")(store)
      ])
    }, 'rankings')
  },

  getComponent (nextState, next) {
    require.ensure([
      "./containers",
      "./modules"
    ], (require) => {
      const Container = require('./containers')
      const reducer = require('./modules').default

      injectReducer(store, { key: 'eventRankings', reducer })

      next(null, Container)
    }, 'rankings')
  }
})
