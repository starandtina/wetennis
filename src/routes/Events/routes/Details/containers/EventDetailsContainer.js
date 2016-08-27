import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import {
  getDetails,
  getSponsors,
  getNotices,
  draw,
  follow
} from "../modules/eventDetails";
import EventDetails from "../components/EventDetails";

const mapStateToProps = (state) => {
  const {details, notices, sponsors} = state.eventDetails;
  return {details, notices, sponsors};
};

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  getDetails,
  getNotices,
  getSponsors,
  draw,
  follow
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetails)
