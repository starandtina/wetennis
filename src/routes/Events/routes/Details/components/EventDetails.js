import React from 'react'
import { findDOMNode } from "react-dom";

import EventInfo from "./EventInfo";
import Notice from "./Notice";
import Sponsors from "./Sponsors";
import Comments from "./Comments";
import Message from "./Message";
import NavBack from "components/NavBack";

import cs from "./EventDetails.scss";

export default class EventDetails extends React.Component {
  componentDidMount() {
    const {
      details,
      getDetails, getNotices, getSponsors, getComments,
      params: {eventId},
      children
    } = this.props;
    // If visiting child page but we had fetched the event details then don't call the service again
    if (children && !!details.name) {
      return
    };
    getDetails(eventId);
    getNotices(eventId);
    getSponsors(eventId);
  }
  render() {
    const {
      draw, follow, details, notices, sponsors,
      params: {eventId},
      location: {pathname},
      children,
    } = this.props;
    if (children) {
      return <div>{children}</div>
    }
    return (
      <div className={cs.box}>
        <NavBack routes={this.props.routes} ref="nav" title=" " transparent className={`${cs.navTransiton}`}>
          <div className={cs.topRightButton}>
            <div className={cs.info}>
              <i className="material-icons">info</i>
            </div>
            <div className={cs.favorite} onClick={follow.bind(this, eventId)}>
              {details.follow
              ? <i className="material-icons">favorite</i>
              : <i className="material-icons">favorite_border</i>}
            </div>
          </div>
        </NavBack>
        <EventInfo data={details} eventId={eventId} />
        <Notice data={notices} />
        <Sponsors data={sponsors} />
        <Comments groupId={eventId} />
        <Message
          data={details}
          path={pathname}
          drawTableAction={draw}
        ></Message>
      </div>
    );
  }
}

