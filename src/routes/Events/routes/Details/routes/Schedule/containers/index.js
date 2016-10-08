import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import EventSchedule from "../components/EventSchedule";
import {getSchedule, getFilter, setCurrentFilter, updateLocationFilters} from "../modules";

const mapStateToProps = (state) => {
  const {currentFilter, filters, schedule} = state.eventSchedule;
  return {currentFilter, filters, schedule};
}

export default connect(
  mapStateToProps,
  {
    getSchedule,
    getFilter,
    setCurrentFilter,
    updateLocationFilters
  }
)(EventSchedule)
