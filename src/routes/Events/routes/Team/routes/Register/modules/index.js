import { combineReducers } from 'redux'

import register, * as fromRegister from './register'
import teamMember, * as fromTeamMember from './teamMember'

export default combineReducers({
  register,
  teamMember,
})

export const getTeamMemberFormInitialValues = (state, fields) =>
  fromTeamMember.getTeamMemberFormInitialValues(state.teamMember, fields)

export const getGroups = (state) => fromRegister.getGroups(state.register)
