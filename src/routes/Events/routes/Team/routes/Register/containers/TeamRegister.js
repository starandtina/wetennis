import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import TeamRegister from '../components/TeamRegister'

import {
  startAddTeamMember,
  saveTeamMember,
  cancelEditTeamMember,
  editTeamMember,
  deleteTeamMember
} from '../modules/teamMember'

import { fetchEventGroups, fetchRegisteredTeams, submitTeamRegisterForm, registerTeam } from '../modules/register'
import { getGroups } from '../modules'

const mapStateToProps = (state) => ({
  groups: getGroups(state.register),
  members: state.register.teamMember.members,
  editing: state.register.teamMember.editing,
  currentEditingTeamMember: state.register.teamMember.currentEditingTeamMember,
})

export default connect(
  mapStateToProps, {
    startAddTeamMember,
    saveTeamMember,
    cancelEditTeamMember,
    editTeamMember,
    deleteTeamMember,

    // register
    fetchEventGroups,
    fetchRegisteredTeams,
    submitTeamRegisterForm,
    registerTeam,

    push,
  }
)(TeamRegister)
