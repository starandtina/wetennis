import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Root from "../components/Rankings";
import {
  getRankings,
  getRankingsFilter,
  setCurrentFilter
} from "../modules";

const mapStateToProps = ({eventRankings: {
  currentFilter, rankings, filters
}}) => ({
  currentFilter, rankings, filters
});

export default connect(
  mapStateToProps,
  {
    getRankings,
    getRankingsFilter,
    setCurrentFilter
  }
)(Root)
