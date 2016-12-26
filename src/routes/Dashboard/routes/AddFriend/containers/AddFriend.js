import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import AddFriend from '../components/AddFriend'
import { searchParticipants, addFriend, removeFriend, saveFriends, clearAddFriend } from '../modules'

const mapStateToProps = state => ({
  user: state.user.user,
  participantList: state.addFriend.participantList,
  friendIds: state.friend && state.friend.friendList.map(f => f.id),
  selectedParticipants: state.addFriend.selectedParticipants,
})

export default connect(
  mapStateToProps,
  {
    searchParticipants,
    addFriend,
    removeFriend,
    saveFriends,
    clearAddFriend,
  },
)(AddFriend)
