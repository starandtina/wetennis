import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import TeamAllocate from '../components/TeamAllocate'
import { fetchRegisteredTeamMembers } from '../modules'

const mapStateToProps = (state) => ({
  registeredTeamMembers: state.teamAllocate && state.teamAllocate.registeredTeamMembers,
})

export default connect(
  mapStateToProps,
  {
    fetchRegisteredTeamMembers,

    push,
  }
)(TeamAllocate)
