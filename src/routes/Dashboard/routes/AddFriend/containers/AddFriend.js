import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import AddFriend from '../components/AddFriend'
import { searchParticipants, addFriend, removeFriend, saveFriends } from '../modules'

const mapStateToProps = state => ({
  user: state.user.user,
  participantList: state.friend.participantList,
  selectedParticipants: state.friend.selectedParticipants,
})

export default connect(
  mapStateToProps,
  {
    searchParticipants,
    addFriend,
    removeFriend,
    saveFriends,
  },
)(AddFriend)
