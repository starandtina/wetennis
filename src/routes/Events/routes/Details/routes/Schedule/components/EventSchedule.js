import React, {Component} from "react";
import NavBack from "components/NavBack";
import ScoreItem from "components/ScoreItem";
import {Link} from "react-router";

import cs from "./EventSchedule.scss";

export default class EventScore extends Component {
  componentDidMount() {
    const {
      getFilter, getSchedule,
      params: {eventId}
    } = this.props;
    document.body.classList.add(cs.bodyBg);
    getFilter(eventId).then(() => {
      const {currentFilter} = this.props;
      getSchedule({
        eventId,
        location: currentFilter.location.value,
        date: currentFilter.date.value
      });
    });
  }
  componentWillUnmount() {
    document.body.classList.remove(cs.bodyBg);
  }
  setCurrentFilter = (filter, field, e) => {
    const value = e.target.value;
    const {
      currentFilter,
      setCurrentFilter,
      updateLocationFilters,
      params: {eventId}
    } = this.props;
    let item = {};
    let location = currentFilter.location;
    for (let v of filter) {
      if (v.value == value) {
        item = v;
        break;
      }
    }
    if (field === "date") {
      if (item.children && item.children.length > 0) {
        location = item.children[0];
        updateLocationFilters(item.children)
      } else {
        location = [];
      }
    }
    setCurrentFilter(eventId, {
      ...currentFilter,
      location,
      [field]: item
    });
  }
  render() {
    const {schedule, currentFilter, filters} = this.props;
    const currentDate = currentFilter.date;
    const currentLocation = currentFilter.location;
    return (
      <div className={cs.box}>
        <NavBack title="赛程" transparent />
        <div className={cs.filter}>
          <div className={cs.timeFilter}>
            <i className="material-icons">alarm</i>
            <div className={cs.filterText}>{currentDate.text || ""}</div>
            <i className="material-icons">keyboard_arrow_down</i>
            <select
              className="dropdown"
              defaultValue={currentDate.value}
              onChange={this.setCurrentFilter.bind(this, filters.date, "date")}
            >
            {filters.date.map((item, index) => {
              return <option key={index} value={item.value}>{item.text}</option>
            })}
            </select>
          </div>
          <div className={cs.locationFilter}>
            <i className="material-icons">place</i>
            <div className={cs.filterText}>{currentLocation.text || ""}</div>
            <i className="material-icons">keyboard_arrow_down</i>
            <select
              className="dropdown"
              defaultValue={currentLocation.value}
              onChange={this.setCurrentFilter.bind(this, filters.location, "location")}
            >
            {filters.location.map((item, index) => {
              return <option
                      key={index}
                      value={item.value}
                    >{item.text}</option>
            })}
            </select>
          </div>
        </div>
        {schedule.map(this.groupItem)}
      </div>
    );
  }
  team = (item, index) => {
    const doubles = item.users.length > 1;
    return (
      <ScoreItem
        key={index}
        user={item.users}
        doubles={doubles}
      >
        <div className={`${cs.first} ${cs.teamItem}`}>
          {item.first
          ? <i className="material-icons">fiber_manual_record</i>
          : undefined}
        </div>
        <div className={`${cs.teamItem} ${item.currentScoreWin ? cs.currentWin : cs.currentLose}`}>
          {item.currentScore}
        </div>
        <div className={`${cs.teamItem} ${cs.winGameNumber}`}>
          {item.winGameNumber}
        </div>
        <div className={`${cs.teamItem} ${cs.score}`}>
          {item.score}
        </div>
        <div className={`${cs.teamItem} ${item.win ? cs.win : cs.lose}`}>
          <i className="material-icons">done</i>
        </div>
      </ScoreItem>
    );
  }
  groupItem = (item, index) => {
    const {date, location} = this.props.currentFilter;
    const {params: {eventId}} = this.props;
    return (
      <div key={index} className={cs.groupItem}>
        <div className={cs.groupNumber}>{item.matches}</div>
        <div className={cs.groupInfo}>
          <div className={cs.matches}>
            {item.group}
          </div>
          {item.gameTime}
        </div>
        <Link to={`/events/${eventId}/match/${item.id}`}>
          {item.team.map(this.team)}
        </Link>
      </div>
    );
  }
}
