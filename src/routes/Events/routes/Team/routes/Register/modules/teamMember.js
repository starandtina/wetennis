import { handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------

export const START_ADD_TEAM_MEMBER = 'START_ADD_TEAM_MEMBER'
export const CANCEL_EDIT_TEAM_MEMBER = 'CANCEL_EDIT_TEAM_MEMBER'
export const EDIT_TEAM_MEMBER = 'EDIT_TEAM_MEMBER'
export const SAVE_TEAM_MEMBER = 'SAVE_TEAM_MEMBER'
export const DELETE_TEAM_MEMBER = 'DELETE_TEAM_MEMBER'

// ------------------------------------
// Actions
// ------------------------------------

export const startAddTeamMember = () => ({
  type: START_ADD_TEAM_MEMBER
})

export const cancelEditTeamMember = () => ({
  type: CANCEL_EDIT_TEAM_MEMBER
})

export const editTeamMember = (id) => ({
  type: EDIT_TEAM_MEMBER,
  payload: id
})

export const saveTeamMember = (data) => ({
  type: SAVE_TEAM_MEMBER,
  payload: data
})

export const deleteTeamMember = (id) => ({
  type: DELETE_TEAM_MEMBER,
  payload: id
})

export const registerTeam = (data) =>({
  types: [REGISTER_TEAM, REGISTER_TEAM_SUCCESS, REGISTER_TEAM_FAILTURE],
  promise: () => API.post(URLConf.registerTeam, {...data} )
})


// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [START_ADD_TEAM_MEMBER]: (state, action) => ({
    ...state,
    editing: true,
  }),
  [CANCEL_EDIT_TEAM_MEMBER]: (state, action) => ({
    ...state,
    currentEditingTeamMember: false,
    editing: false,
  }),
  [EDIT_TEAM_MEMBER]: (state, action) => ({
    ...state,
    currentEditingTeamMember: {
      ...state.members[action.payload],
      id: action.payload
    },
    editing: true,
  }),
  [SAVE_TEAM_MEMBER]: (state, action) => ({
    ...state,
    members: {
      ...state.members,
      [action.payload.id]: action.payload
    },
    currentEditingTeamMember: false,
    editing: false,
  }),
  [DELETE_TEAM_MEMBER]: (state, action) => {
    const members = state.members
    const results = {}

    Object.keys(state.members).forEach(k => {
      if (k != action.payload) {
        results[k] = members[k]
      }
    })

    return {
      ...state,
      members: results,
      editing: false,
    }
  }
}, {
  members: {
    'ccf485c8-b3f7-4377-bbc6-8008430a7962': {
      name: 'testing',
      gender: 'male',
      identify: 'identifyCard',
      idNumber: '500230199010110010',
      identifyCard: '500230199010110010',
      isBench: false
    }
  }
})

// ------------------------------------
// Selectors
// ------------------------------------
export const getTeamMemberFormInitialValues = ({ currentEditingTeamMember }, fields) => {
  if (currentEditingTeamMember) {
    let initialValues = {}

    fields.forEach(k => {
      if (k in currentEditingTeamMember) {
        initialValues[k] = currentEditingTeamMember[k]
      }
    })

    return initialValues
  }

  return {
    gender: 'male',
    identify: 'identifyCard',
    isBench: false
  }
}
