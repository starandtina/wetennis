import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import TeamAllocate from '../components/TeamAllocate'
import { fetchRegisteredTeamSequence, fetchRegisteredTeamMembers } from '../modules'

const mapStateToProps = (state) => ({
  registeredTeamSequence: state.teamAllocate && state.teamAllocate.registeredTeamSequence,
  registeredTeamMembers: state.teamAllocate && state.teamAllocate.registeredTeamMembers,
})

export default connect(
  mapStateToProps,
  {
    fetchRegisteredTeamSequence,
    fetchRegisteredTeamMembers,

    push,
  }
)(TeamAllocate)
