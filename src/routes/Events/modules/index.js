import {combineReducers} from "redux";

import {list, location, status, currentFilter} from "./eventList";

export default combineReducers({
  list,
  location,
  status,
  currentFilter
})
