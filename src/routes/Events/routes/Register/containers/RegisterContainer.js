import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import prop from 'lodash/fp/prop';

import { fetchEventGroups, fetchRegisteredUsers, fetchPartners, selectCategory, setPartnerId } from '../modules/register'
import Register from '../components/Register'

const mapStateToProps = (state) => ({
  groups: state.register.groups,
  group: state.register.group,
  item: state.register.item,
  registeredUsers: state.register.registeredUsers,
  partners: state.register.partners,
  userId: prop('user.user.id')(state)
})

export default connect(
  mapStateToProps,
  {
    fetchEventGroups,
    fetchRegisteredUsers,
    fetchPartners,
    setPartnerId,
    selectCategory,
    push
  }
)(Register)
