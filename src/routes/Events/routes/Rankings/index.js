import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: ':eventId/Rankings',

  getChildRoutes (location, cb) {
    console.log("rankings getChildRoutes");
    require.ensure([], (require) => {
      cb(null, [
        require("./routes/Details")(store)
      ])
    })
  },

  getComponent (nextState, next) {
    console.log("rankings getComponent");
    require.ensure([], (require) => {
      const Container = require('./containers')
      const reducer = require('./modules').default

      injectReducer(store, { key: 'eventRankings', reducer })

      next(null, Container)
    })
  }
})
