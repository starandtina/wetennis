import React, {Component} from "react";
import NavBack from "components/NavBack";
import ScoreItem from "components/ScoreItem";

import cs from "./EventSchedule.scss";

export default class EventScore extends Component {
  componentDidMount() {
    const {
      getFilter, getSchedule,
      params: {eventId}
    } = this.props;
    getFilter(eventId);
    getSchedule(eventId);
    document.body.classList.add(cs.bodyBg);
  }
  componentWillUnmount() {
    document.body.classList.remove(cs.bodyBg);
  }
  setCurrentFilter = (field, e) => {
    const value = e.target.value;
    const {currentFilter, setCurrentFilter} = this.props;
    const __obj = {...currentFilter, [field]: Number(value)};
    setCurrentFilter(__obj);
  }
  render() {
    const {schedule, currentFilter, filters} = this.props;
    const currentDate = filters.date.filter(item => item.value === currentFilter.date)[0];
    const currentLocation = filters.location.filter(item => item.value === currentFilter.location)[0];
    const date = currentDate ? currentDate.text : "";
    const location = currentLocation ? currentLocation.text : "";
    return (
      <div className={cs.box}>
        <NavBack title="赛程" />
        <div className={cs.filter}>
          <div className={cs.timeFilter}>
            <i className="material-icons">alarm</i>
            <div className={cs.filterText}>{date}</div>
            <i className="material-icons">keyboard_arrow_down</i>
            <select
              className="dropdown"
              defaultValue={currentFilter.date}
              onChange={this.setCurrentFilter.bind(this, "date")}
            >
            {filters.date.map((item, index) => {
              return <option key={index} value={item.value}>{item.text}</option>
            })}
            </select>
          </div>
          <div className={cs.locationFilter}>
            <i className="material-icons">place</i>
            <div className={cs.filterText}>{location}</div>
            <i className="material-icons">keyboard_arrow_down</i>
            <select
              className="dropdown"
              defaultValue={currentFilter.location}
              onChange={this.setCurrentFilter.bind(this, "location")}
            >
            {filters.location.map((item, index) => {
              return <option key={index} value={item.value}>{item.text}</option>
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
    if (!(item.date === date || date === 0)) return;
    if (!(item.location === location || location === 0)) return;
    return (
      <div key={index} className={cs.groupItem}>
        <div className={cs.groupNumber}>{item.matches}</div>
        <div className={cs.groupInfo}>
          <div className={cs.matches}>
            {item.group}
          </div>
          {item.gameTime}
        </div>
        {item.team.map(this.team)}
      </div>
    );
  }
}
