import {combineReducers} from "redux";

import {list, locationFilter} from "./eventList";

export default combineReducers({
  list,
  locationFilter
})
