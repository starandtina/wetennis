import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import DrawTable from "../components/DrawTable";
import {
  getFilter,
  getDrawTable,
  setCurrentMatch,
  setCurrentFilter
} from "../modules/drawTable";

const mapStateToProps = (state) => {
  const {
    currentMatch, data, filters, currentFilter
  } = state.drawTable
  return {
    currentMatch, data, filters, currentFilter
  }
}

export default connect(
  mapStateToProps,
  {
    getFilter,
    getDrawTable,
    setCurrentMatch,
    setCurrentFilter
  }
)(DrawTable)
