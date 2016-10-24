import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { logoutUser, fetchMyData } from '../../../modules/user'
import Dashboard from '../components/me'

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = {
  fetchMyData, logoutUser, push
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
