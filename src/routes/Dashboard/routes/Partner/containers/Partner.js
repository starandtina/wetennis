import React from 'react'
import { connect } from 'react-redux'

import Partner from '../components/Partner'
import { fetchMyFriendList, setPartner } from '../modules'

const mapStateToProps = state => ({
  user: state.user.user,
  partnerList: state.partner.partnerList,
  partner: state.partner.partner,
})

export default connect(
  mapStateToProps,
  {
    fetchMyFriendList,
    setPartner,
  },
)(Partner)
