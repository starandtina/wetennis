import {
  is,
  del,
  set,
  getSimple
} from 'utils/cookie'

const USER_ID = 'USER_ID'

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/dashboard/signin',
      state: {
        nextPathname: nextState.location.pathname
      }
    })
  }
}

function setCookie(user_id) {
  set(USER_ID, user_id)
}

function getCookie() {
  if (is(USER_ID)) {
    return getSimple(USER_ID)
  }
}

function loggedIn() {
  return !!is(USER_ID)
}

function logout(cb) {
  del(USER_ID)

  if (cb) {
    cb();
  }
}

export {
  requireAuth,
  setCookie,
  getCookie,
  loggedIn,
  logout
}
