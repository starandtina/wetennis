import { injectReducer } from '../store/reducers'
import CoreLayout from '../layouts/CoreLayout/CoreLayout'

export const createRoutes = (store) => {
  const routes = {
    path: '/',
    component: CoreLayout,
    getChildRoutes (location, next) {
      require.ensure([], (require) => {
        next(null, [
          require('./News')(store),
          require('./Dashboard')(store),
          require('./Events')(store),
          require('./Referee')(store),
          require('./Rankings')(store),
          require('./Time')(store),
          require('./NotFound')
        ])
      })
    }, 
    getIndexRoute (nextState, next) {
      require.ensure([], (require) => {
        injectReducer(store, { key: 'newsList', reducer: require('./News/modules/newsList').default })

        next(null, { component: require('./News/containers/NewsListContainer') })
      })
    }
  }

  return routes
}

export default createRoutes
