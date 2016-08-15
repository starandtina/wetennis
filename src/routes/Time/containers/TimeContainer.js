import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'

import { fetchMyTimes } from '../actions';
const myData = {
  "id": "sha32dsjk23",
    "name": "my real name",
    "username": "pacific0437",
    "password": "88888888",
    "phone": "18629032103",
    "gender": "male",
    "cardId": "232323198611111111"
}
const mapStateToProps = (state) => ({
  user: state.user || myData,
  time: state.time
});

const mapDispatchToProps = ({
  fetchMyTimes, push
})

class Times extends Component {
  render() {
    return (
      <div>123</div>
    )
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Times)