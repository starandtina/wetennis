import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Infomation from "../components/Infomation";
import {
  getInfomation
} from "../modules/Infomation";

const mapStateToProps = (state) => {
  const {
    infomation
  } = state.EventInfomation
  return {
    data: infomation
  }
}

export default connect(
  mapStateToProps,
  {
    getInfomation
  }
)(Infomation);
