import React from "react";
import {Link} from "react-router";
import classes from "./EventList.scss";

export default class EventList extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <div className={classes.eventList}>
        {data.map((item, index) => {
          return (
            <Link
              key={index}
              className={classes["eventList-item"]}
              to={`/events/${item.id}`}
            > 
              <div className={classes["eventList-left"]}>
                <img src={item.thumb} className={classes["eventList-thumb"]} alt="" />
                <div className={classes["eventList-type"]}>{item.type}</div>
              </div>

              <div className={classes["eventList-right"]}>
                <div className={classes["eventList-name"]}>{item.name}</div>
                <div className={classes["eventList-date"]}>
                  {`${item.startDate} - ${item.endDate.split('.')[2] || ""}`}
                </div>
                <div className={classes["eventList-location"]}>{item.location}</div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}
