import { combineReducers } from 'redux'

// -----------------------------
// Reducer
// -----------------------------
export function list(state = [], { type, payload }) {
  let s = state

  switch (type) {
  case GET_EVENT_LIST_SUCCESS:
    s = payload;
    break;
  }

  return s
}


export default combineReducers({
  list
})
