import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import {getDetails, getSponsors, getNotices, getComments} from "../modules/eventDetails";
import EventDetails from "../components/EventDetails";

const mapStateToProps = (state) => {
  const {details, notices, comments, sponsors} = state.eventDetails;
  return {details, notices, comments, sponsors};
};

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  getDetails,
  getNotices,
  getComments,
  getSponsors,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetails)
