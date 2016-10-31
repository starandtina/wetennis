import { combineReducers } from 'redux'

import program, * as fromProgram from './program'

export default combineReducers({
  program
})

export const getUnScheduledMatchIds = (state) => fromProgram.getUnScheduledMatchIds(state.program)
