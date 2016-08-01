import { injectReducer } from '../store/reducers'
import CoreLayout from '../layouts/CoreLayout/CoreLayout'

export const createRoutes = (store) => {
  const routes = {
    path: '/',
    component: CoreLayout,
    getChildRoutes (location, next) {
      require.ensure([], (require) => {
        next(null, [
          // Provide store for async reducers and middleware
          require('./Dashboard')(store),
          require('./Events')(store),
          require('./Referee')(store),
          require('./Rankings')(store),
          require('./NotFound')
        ])
      })
    }, 
    getIndexRoute (nextState, next) {
      require.ensure([], (require) => {
        injectReducer(store, { key: 'news', reducer: require('./News/modules') })

        next(null, { component: require('./News/containers/NewsContainer') })
      })
    }
  }

  return routes
}

export default createRoutes
