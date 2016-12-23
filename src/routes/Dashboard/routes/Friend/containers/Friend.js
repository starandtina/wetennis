import React from 'react'
import { connect } from 'react-redux'

import Friend from '../components/Friend'
import { fetchMyFriendList, setFriend } from '../modules'

const mapStateToProps = state => ({
  user: state.user.user,
  friendList: state.friend.friendList,
})

export default connect(
  mapStateToProps,
  {
    fetchMyFriendList,
    setFriend,
  },
)(Friend)
