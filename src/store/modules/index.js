import { handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const LOADING = 'LOADING'
export const LOADED = 'LOADED'
export const ERROR = 'ERROR'
export const ERROR_HIDE = 'ERROR_HIDE'

// ------------------------------------
// Actions
// ------------------------------------
export const loading = () => ({
  type: LOADING
})

export const loaded = () => ({
  type: LOADED
})

export const error = (msg) => ({
  type: ERROR,
  payload: msg
})

export const errorHide = () => ({
  type: ERROR_HIDE
})

// -----------------------------
// Reducer
// -----------------------------
export default handleActions({
  [LOADING]: (state, action) => ({
    ...state,
    isLoading: true
  }),
  [LOADED]: (state, action) => ({
    ...state,
    isLoading: false
  }),
  [ERROR]: (state, {payload}) => ({
    ...state,
    error: payload
  }),
  [ERROR_HIDE]: (state, action) => ({
    ...state,
    error: false
  })
}, { isLoading: false, error: false })
