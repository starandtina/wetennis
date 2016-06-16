import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import {getDetails} from "../modules/eventDetails";
import EventDetails from "../components/EventDetails";

const mapStateToProps = (state) => ({
  details: state.eventDetails.details,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  getDetails,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetails)
