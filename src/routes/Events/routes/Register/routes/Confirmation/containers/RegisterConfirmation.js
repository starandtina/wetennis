import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { uploadUserInfo } from '../../../modules/register';

import RegisterConfirmation from '../components/RegisterConfirmation'

const mapStateToProps = (state) => {
  return ({
  user: state.user.user,
  group: state.register.group,
  item: state.register.item,
  partnerId: state.register.partnerId,
  partners: state.register.partners
})}

const mapDispatchToProps = (dispatch) => bindActionCreators({ uploadUserInfo, push }, dispatch);


// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(RegisterConfirmation)
