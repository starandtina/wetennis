import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import TeamAllocate from '../components/TeamAllocate'
import {
  fetchRegisteredTeamSequence,
  updateRegisteredTeamSequence,

  fetchRegisteredTeamMembers,
  getUnScheduledTeamMemberIds,
  moveTeamMember,
} from '../modules'

const mapStateToProps = (state) => ({
  unScheduledTeamMemberIds: getUnScheduledTeamMemberIds(state.teamAllocate),
  registeredTeamSequence: state.teamAllocate && state.teamAllocate.registeredTeamSequence,
  registeredTeamMembers: state.teamAllocate && state.teamAllocate.registeredTeamMembers.reduce((members, m) => {
    members[m.id] = m

    return members
  }, {}),
})

export default connect(
  mapStateToProps,
  {
    fetchRegisteredTeamSequence,
    updateRegisteredTeamSequence,
    fetchRegisteredTeamMembers,
    moveTeamMember,

    push,
  }
)(TeamAllocate)
