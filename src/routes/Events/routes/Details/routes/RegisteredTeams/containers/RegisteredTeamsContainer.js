import React from 'react'
import { connect } from 'react-redux'

import RegisteredTeams from '../components/RegisteredTeams'
import { fetchRegisteredTeams } from '../modules'

const mapStateToProps = state => ({
  registeredTeams: state.eventRegisteredTeams.registeredTeams,
})

export default connect(
  mapStateToProps,
  {
    fetchRegisteredTeams,
  }
)(RegisteredTeams)
