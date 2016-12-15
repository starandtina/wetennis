export default ({
  path: 'techRank',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const techRankContainer = require('./containers/TechRankContainer');
      next(null, techRankContainer)
    }, 'dashboard')
  }
})
