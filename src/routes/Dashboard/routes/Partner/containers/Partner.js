import React from 'react'
import { connect } from 'react-redux'

import Partner from '../components/Partner'
import { fetchMyFriendList, searchParticipants, setPartner } from '../modules'

const mapStateToProps = state => ({
  user: state.user.user,
  ...state.partner,
})

export default connect(
  mapStateToProps,
  {
    fetchMyFriendList,
    searchParticipants,
    setPartner,
  },
)(Partner)
