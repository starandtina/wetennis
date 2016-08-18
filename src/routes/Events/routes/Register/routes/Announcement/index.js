export default {
  path: 'announcement',

  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const Announcement = require('./containers/Announcement')

      next(null, Announcement)
    }, 'events')
  }
}
