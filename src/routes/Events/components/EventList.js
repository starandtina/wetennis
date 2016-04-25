import React from "react";
import {Link} from "react-router";

export default class EventList extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <div className="eventList">
        {data.map((item, index) => {
          return (
            <Link
              key={index}
              className="eventList-item"
              to={`/events/${item.id}`}
            > 
              <div className="eventList-left">
                <img src={item.thumb} className="thumb" alt="" />
                <div className="type">{item.type}</div>
              </div>

              <div className="eventList-right">
                <div className="name">{item.name}</div>
                <div className="date">{`${item.startDate} - ${item.endDate}`}</div>
                <div className="location">{item.location}</div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}
