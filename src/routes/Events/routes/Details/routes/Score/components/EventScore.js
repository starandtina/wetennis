import React, {Component} from "react";
import NavBack from "components/NavBack";
import ScoreItem from "components/ScoreItem";
import CascadeFilter from "components/CascadeFilter";
import {Link} from "react-router";

import cs from "./EventScore.scss";

export default class EventScore extends Component {
  componentDidMount() {
    const {
      getGroupFilter, getScore,
      params: {eventId},
      currentFilter
    } = this.props;
    getGroupFilter(eventId).then(() => {
      getScore(currentFilter);
    });
    document.body.classList.add(cs.bodyBg);
  }
  componentWillUnmount() {
    document.body.classList.remove(cs.bodyBg);
  }
  setCurrentFilter = (field, e) => {
    const {
      currentFilter, setCurrentFilter, getScore,
      params: {eventId}
      } = this.props;
    if (field === "itemId") {
      const itemId = e.itemId;
      setCurrentFilter({...currentFilter, itemId});
    } else {
      const value = e.target.value;
      setCurrentFilter({...currentFilter, [field]: value});
    }
  }
  render() {
    const {score, currentFilter, filters} = this.props;
    const currentStatus = filters.status.filter(item => item.value == currentFilter.status)[0];
    const status = currentStatus ? currentStatus.text : "";
    return (
      <div className={cs.box}>
        <NavBack routes={this.props.routes} title="比分" transparent={true} />
        <div className={cs.pageTitle}>
          <CascadeFilter
            className={cs.groupFilter}
            filters={filters.itemId}
            filterKeys={["group", "itemId"]}
            onChange={this.setCurrentFilter.bind(this, "itemId")}
          />
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
        {score.map(this.groupItem)}
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
    const {currentFilter: {type, status}, params: {eventId}} = this.props;
    if (!(item.status == status || status == 0)) return;
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
