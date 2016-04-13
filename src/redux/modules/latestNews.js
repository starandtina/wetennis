import { createAction, handleActions } from 'redux-actions'
import fetch from 'isomorphic-fetch'

// Constants
// ------------------------------------
export const FETCH_LATEST_NEWS = 'FETCH_LATEST_NEWS'


// ------------------------------------
// Actions
// ------------------------------------
export const fetchLatestNews = createAction(FETCH_LATEST_NEWS, (args) => {
  return dispatch => {
    dispatch(
      get(FETCH_LATEST_NEWS, { url: 'https://randomuser.me/api/' })
    )
  }

  // return fetch(args).then(function(response) {
  //   return response.json();
  // })
})

const loading = createAction('LOADING');

const get = createAction('get', (type, opts) => {
  return dispatch => {
    dispatch(loading())
    dispatch({
      type,
      payload: fetch(opts.url).then(response => response.json())
    })
  }
})


export const actions = {
  fetchLatestNews
}

// ------------------------------------
// Reducer
// ------------------------------------
const reducer = handleActions({
  LOADING: (state, action) => {
    return state
  },
  [FETCH_LATEST_NEWS]: (state, action) => action.payload.results
}, [])

export default reducer
