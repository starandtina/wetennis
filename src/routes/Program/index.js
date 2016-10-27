import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'program/:eventId/:date',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const reducer = require('./modules/program').default

      injectReducer(store, { key: 'program', reducer })

      next(null, require('./containers/ProgramContainer'))
    }, 'program')
  }
})
