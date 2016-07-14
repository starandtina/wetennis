import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Root from "../components/RankingDetails";

const mapStateToProps = (state) => {
}

export default connect(
  mapStateToProps,
  {
  }
)(Root)
