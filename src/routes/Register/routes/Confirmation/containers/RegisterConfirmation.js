import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import RegisterConfirmation from '../components/RegisterConfirmation'

const mapStateToProps = (state) => ({
  user: state.user,
  group: state.register.group,
  item: state.register.item
})

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators({ }, dispatch)
})

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(RegisterConfirmation)