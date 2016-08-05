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
      getDetails, getNotices, getSponsors, getComments,
      params: {eventId}
    } = this.props;
    getDetails(eventId);
    getNotices(eventId);
    getComments(eventId);
    getSponsors(eventId);
    const nav = findDOMNode(this.refs["nav"]);
    document.addEventListener("scroll", function() {
      if (document.body.scrollTop < 10) {
        nav.classList.add(cs.nav);
      } else {
        nav.classList.remove(cs.nav);
      }
    })
  }
  render() {
    const {
      likeComment, sendComment, getComments, draw, follow,
      details, notices, comments, sponsors,
      params: {eventId},
      location: {pathname}
    } = this.props;
    return (
      <div className={cs.box}>
        <NavBack ref="nav" title=" " className={`${cs.navTransiton} ${cs.nav}`}>
          <div className={cs.topRightButton}>
            <div className={cs.info}>
              <i className="material-icons">info</i>
            </div>
            <div className={cs.favorite} onClick={follow.bind(this, eventId)}>
              {true
              ? <i className="material-icons">favorite</i>
              : <i className="material-icons">favorite_border</i>}
            </div>
          </div>
        </NavBack>
        <EventInfo data={details} eventId={eventId} />
        <Notice data={notices} />
        <Sponsors data={sponsors} />
        <Comments
          groupId={eventId}
          data={comments}
          likeAction={likeComment}
          sendAction={sendComment}
        />
        <Message
          data={details}
          path={pathname}
          drawTableAction={draw}
        ></Message>
      </div>
    );
  }
}
