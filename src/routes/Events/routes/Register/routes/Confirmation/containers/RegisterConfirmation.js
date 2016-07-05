import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import RegisterConfirmation from '../components/RegisterConfirmation'

const mapStateToProps = (state) => {
  console.log(state);
  return ({
  user: state.register.user,
  group: state.register.group,
  item: state.register.item,
  parnterId: state.register.parnterId
})}

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators({ }, dispatch)
})

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(RegisterConfirmation)
