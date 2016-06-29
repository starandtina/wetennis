import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import DrawTable from "../components/DrawTable";
import {getDrawTable, setCurrentMatch} from "../modules/drawTable";

const mapStateToProps = (state) => ({
  currentMatch: state.drawTable.currentMatch,
  data: state.drawTable.data
})

export default connect(
  mapStateToProps,
  {
    getDrawTable,
    setCurrentMatch,
  }
)(DrawTable)
