export default ({
  path: 'techRank',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const techRankContainer = require('./containers/techRankContainer');
      next(null, techRankContainer)
    }, 'dashboard')
  }
})
