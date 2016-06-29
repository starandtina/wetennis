import React from 'react'

import EventInfo from "./EventInfo";
import Notice from "./Notice";
import Sponsors from "./Sponsors";
import Comments from "./Comments";
import Message from "./Message";

export default class EventDetails extends React.Component {
  componentDidMount() {
    const {
      getDetails, getNotices, getSponsors, getComments,
      params: {eventId}
    } = this.props;
    getDetails(eventId);
    getNotices(eventId);
    getComments(eventId);
    getSponsors(eventId);
  }
  render() {
    const {
      likeComment, sendComment, getComments,
      details, notices, comments, sponsors,
      params: {eventId}
    } = this.props;
    return (
      <div>
        <EventInfo data={details} />
        <Notice data={notices} />
        <Sponsors data={sponsors} />
        <Comments
          groupId={eventId}
          data={comments}
          likeAction={likeComment}
          sendAction={sendComment}
        />
        <Message data={details}></Message>
      </div>
    );
  }
}
