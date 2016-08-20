import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import EventScore from "../components/EventScore";
import {
  getGuessEventInfo
} from "../modules";

const mapStateToProps = (state) => {
  const {
    eventInfo
  } = state.guessEventInfo;
  return {
    eventInfo
  };
}

export default connect(
  mapStateToProps,
  {
    getGuessEventInfo
  }
)(EventScore)
