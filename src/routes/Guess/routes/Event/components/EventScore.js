import React, {Component} from "react";
import NavBack from "components/NavBack";
import ScoreItem from "components/ScoreItem";

import cs from "./EventScore.scss";

export default class EventScore extends Component {
  componentDidMount() {
    const {
      getGuessEventInfo,
      params: {eventId}
    } = this.props;
    getGuessEventInfo(eventId);
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
    const {eventInfo: {games, eventDetail}} = this.props;
    // const {score, currentFilter, filters} = this.props;
    // const {score, currentFilter, filters} = this.props;
    // const currentType = filters.type.filter(item => item.value === currentFilter.type)[0];
    // const currentStatus = filters.status.filter(item => item.value === currentFilter.status)[0];
    // const title = currentType ? currentType.text : "";
    // const status = currentStatus ? currentStatus.text : "";
    const currentFilter = {};
    const currentStatus = {};
    const title = "";
    const status = "";
    const filters = {status: []};
    return (
      <div className={cs.box}>
        <NavBack title="赛事">
        {/*
          <div className={cs.typeFilter}>
            <i className="material-icons">more_vert</i>
            <select
              className="dropdown"
              defaultValue={currentFilter.type}
              onChange={this.setCurrentFilter.bind(this, "type")}
            >
            {filters.type.map((item, index) => {
              return <option
                      key={index}
                      value={item.value}
                    >{item.text}</option>
            })}
            </select>
          </div>*/}
        </NavBack>
        <div className={cs.pageTitle}>
          <h3 className={cs.title}>{title}</h3>
          <div className={cs.statusFilter}>
            {status}
            <i className="material-icons">keyboard_arrow_down</i>
            <select
              className="dropdown"
              defaultValue={currentFilter.status}
              onChange={this.setCurrentFilter.bind(this, "status")}
            >
            {filters.status.map((item, index) => {
              return (
              <option
                key={index}
                value={item.value}
              >{item.text}</option>
              );
            })}
            </select>
          </div>
        </div>
        <div className={cs.eventDetail}>
          <div className={cs.thumb}><img src={eventDetail.thumb} /></div>
          <div className={cs.info}>
            <div className={cs.name}>{eventDetail.name}</div>
            <div className={cs.time}>{eventDetail.time}</div>
            <div className={cs.matchName}>{eventDetail.matchName}</div>
          </div>
        </div>
        {games.map(this.groupItem)}
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
    // const {currentFilter: {type, status}} = this.props;
    // if (!(item.type === type || type === 0)) return;
    // if (!(item.status === status || status === 0)) return;
    return (
      <div key={index} className={cs.groupItem}>
        <div className={cs.groupInfo}>
          <div className={cs.matches}>{item.matches}</div>
          {item.gameTime}
        </div>
        {item.team.map(this.team)}
      </div>
    );
  }
}
