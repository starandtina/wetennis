import React from 'react'
import { connect } from 'react-redux'

import RegisteredMembers from '../components/RegisteredMembers'
import { fetchRegisteredMembers } from '../modules'

const mapStateToProps = state => ({
  registeredMembers: state.eventRegisteredMembers.registeredMembers,
})

export default connect(
  mapStateToProps,
  {
    fetchRegisteredMembers,
  }
)(RegisteredMembers)
