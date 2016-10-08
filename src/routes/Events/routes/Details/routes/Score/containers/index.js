import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import EventScore from "../components/EventScore";
import {getScore, getGroupFilter, setCurrentFilter} from "../modules";

const mapStateToProps = (state) => {
  const {currentFilter, filters, score} = state.eventScore;
  return {currentFilter, filters, score};
}

export default connect(
  mapStateToProps,
  {
    getScore,
    getGroupFilter,
    setCurrentFilter
  }
)(EventScore)
