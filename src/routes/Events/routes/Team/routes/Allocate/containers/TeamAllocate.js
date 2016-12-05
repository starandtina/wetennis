import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import TeamAllocate from '../components/TeamAllocate'
import { fetchRegisteredTeamSequence, fetchRegisteredTeamMembers, moveTeamMember, getUnScheduledTeamMemberIds } from '../modules'

const mapStateToProps = (state) => ({
  unScheduledTeamMemberIds: getUnScheduledTeamMemberIds(state.teamAllocate),
  registeredTeamSequence: state.teamAllocate && state.teamAllocate.registeredTeamSequence,
  registeredTeamMembers: state.teamAllocate && state.teamAllocate.registeredTeamMembers,
})

export default connect(
  mapStateToProps,
  {
    fetchRegisteredTeamSequence,
    fetchRegisteredTeamMembers,
    moveTeamMember,

    push,
  }
)(TeamAllocate)
