import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import { fetchGroups, fetchRegisteredUsers, selectCategory } from '../modules/register'
import Register from '../components/Register'

const mapStateToProps = (state) => ({
  groups: state.register.groups,
  group: state.register.group,
  item: state.register.item,
  registeredUsers: state.register.registeredUsers
})

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators({ fetchGroups, fetchRegisteredUsers, selectCategory, push }, dispatch)
})

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Register)
