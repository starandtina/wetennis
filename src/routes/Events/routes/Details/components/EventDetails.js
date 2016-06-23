import React from 'react'

import EventInfo from "./EventInfo";
import Notice from "./Notice";
import Sponsors from "./Sponsors";
import Comments from "./Comments";

export default class EventDetails extends React.Component {
  componentDidMount() {
    const {getDetails, getNotices, getSponsors, getComments, params: {eventId}} = this.props;
    getDetails(eventId);
    getNotices(eventId);
    getComments(eventId);
    getSponsors(eventId);
  }
  render() {
    const {details, notices, comments, sponsors} = this.props;
    return (
      <div>
        <EventInfo data={details} />
        <Notice data={notices} />
        <Sponsors data={sponsors} />
        <Comments data={comments} />
      </div>
    );
  }
}
