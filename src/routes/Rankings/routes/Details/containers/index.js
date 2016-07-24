import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import {getInfo, getDoubleTab, getSingleTab, likeUser} from "../modules";
import Root from "../components/RankingDetails";

const mapStateToProps = (state) => {
  const {info, singleTab, doubleTab} = state.rankingDetails;
  return {
    info, singleTab, doubleTab
  }
}

export default connect(
  mapStateToProps,
  {
    getInfo,
    getDoubleTab,
    getSingleTab,
    likeUser,
  }
)(Root)
