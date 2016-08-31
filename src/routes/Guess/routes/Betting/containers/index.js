import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Betting from "../components/Betting";
import {
  getInfo, submit
} from "../modules";

const mapStateToProps = (state) => {
  const {
    info
  } = state.guessBetting
  return {
    info
  }
}

export default connect(
  mapStateToProps,
  {
    getInfo, submit
  }
)(Betting)
