import { is, del } from 'utils/cookie'

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/signup',
      state: {
        nextPathname: nextState.location.pathname
      }
    })
  }
}

function loggedIn() {
  return !!is('user_id')
}

function logout(cb) {
  del('user_id')

  if (cb) {
    cb();
  }
}

export {
  requireAuth,
  loggedIn,
  logout
}
