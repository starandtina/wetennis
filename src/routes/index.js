import { injectReducer } from '../store/reducers'
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import { loggedIn, getCookie } from 'utils/auth';
import { fetchUserInfo } from './Dashboard/modules/user';

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
          require('./Guess')(store),
          require('./NotFound')
        ])
      }, 'index')
    }, 
    getIndexRoute (nextState, next) {
      require.ensure([], (require) => {
        injectReducer(store, { key: 'newsList', reducer: require('./News/modules/newsList').default })
        next(null, { component: require('./News/containers/NewsListContainer') })
      }, 'index')
    },
    onEnter: (nextState, replace, callback) => {
      injectReducer(store, { key: 'user', reducer: require('./Dashboard/modules/user').default });
      if(loggedIn() && !store.getState().user.user.id){
        store.dispatch(fetchUserInfo({
          userId: getCookie()
        })).then(action => callback())
      } else {
        callback();
      }
    }
  }

  return routes
}

export default createRoutes
