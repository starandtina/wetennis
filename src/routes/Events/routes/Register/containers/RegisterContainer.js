import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import { fetchEventGroups, fetchRegisteredUsers, selectCategory } from '../modules/register'
import Register from '../components/Register'

const mapStateToProps = (state) => ({
  groups: state.register.groups,
  group: state.register.group,
  item: state.register.item,
  registeredUsers: state.register.registeredUsers
})

export default connect(
  mapStateToProps,
  {
    fetchEventGroups,
    fetchRegisteredUsers,
    selectCategory,
    push
  }
)(Register)
