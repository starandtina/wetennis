import {
  is,
  del,
  set
} from 'utils/cookie'

const USER_ID = 'USER_ID'

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/dashboard/signup',
      state: {
        nextPathname: nextState.location.pathname
      }
    })
  }
}

function setCookie(user_id) {
  set(USER_ID, user_id)
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
  loggedIn,
  logout
}
