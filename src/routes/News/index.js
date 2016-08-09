import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'news',
  onEnter() {
  },
  getChildRoutes (location, next) {
    require.ensure([], (require) => {
      next(null, [
        require('./routes/Detail')(store)
      ])
    }, 'news')
    
  },
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      injectReducer(store, { key: 'newsList', reducer: require('./modules/newsList').default })

      next(null, require('./containers/NewsListContainer'))
    })
  }
})
