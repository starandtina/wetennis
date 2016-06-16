import React from 'react'

import EventInfo from "./EventInfo";

export default class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    const {getDetails, params: {eventId}} = this.props;
    getDetails(eventId);
  }
  render() {
    const {details} = this.props;
    return (
      <div>
        <EventInfo data={details} />
      </div>
    );
  }
}
