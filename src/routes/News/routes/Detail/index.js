import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: ':newsId',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      injectReducer(store, { key: 'newsDetail', reducer: require('./modules/newsDetail').default })

      next(null, require('./containers/NewsDetailContainer'))
    })
  }
})
