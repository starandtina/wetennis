import React from 'react'
import { connect } from 'react-redux'

import Follow from '../components/Follow'
import { fetchFollowedPartnerList, addPartner } from '../modules'

const mapStateToProps = (state) => ({
  user: state.user.user,
  partnerList: state.follow.partnerList,
})

export default connect(
  mapStateToProps,
  {
    fetchFollowedPartnerList,
    addPartner,
  },
)(Follow)
