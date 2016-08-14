import { handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const LOADING = 'LOADING'
export const LOADED = 'LOADED'

// ------------------------------------
// Actions
// ------------------------------------
export const loading = () => ({
  type: LOADING
})

export const loaded = () => ({
  type: LOADED
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
  })
}, { isLoading: false })
