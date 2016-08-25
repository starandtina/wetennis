import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import EventScore from "../components/EventScore";
import {
  getGuessEventInfo, getGuessEventFilter, setCurrentFilter, setSubGroupFilter
} from "../modules";

const mapStateToProps = (state) => {
  const {
    eventInfo, eventFilter, currentFilter, subGroupFilter
  } = state.guessEventInfo
  return {
    eventInfo, eventFilter, currentFilter, subGroupFilter
  }
}

export default connect(
  mapStateToProps,
  {
    getGuessEventInfo, getGuessEventFilter, setCurrentFilter, setSubGroupFilter
  }
)(EventScore)
