import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Pay from '../components/Pay'

const mapStateToProps = (state) => ({
  group: state.register && state.register.register.group,
})

export default connect(
  mapStateToProps,
  {
    push
  }
)(Pay)
