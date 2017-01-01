import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Time from '../components/Time'

import {
  fetchTimesList,
  fetchTimeInfo,
  deleteTime,
  clearTime,
} from '../modules'

const mapStateToProps = state => ({
  user: state.user,
  time: state.time,
})

export default connect(mapStateToProps, {
  fetchTimesList,
  fetchTimeInfo,
  push,
  deleteTime,
  clearTime,
})(Time)
