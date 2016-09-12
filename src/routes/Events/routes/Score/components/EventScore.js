import React, {Component} from "react";
import NavBack from "components/NavBack";
import ScoreItem from "components/ScoreItem";
import CascadeFilter from "components/CascadeFilter";

import cs from "./EventScore.scss";

export default class EventScore extends Component {
  componentDidMount() {
    const {
      getStateFilter, getGroupFilter, getScore,
      params: {eventId}
    } = this.props;
    getStateFilter(eventId);
    getGroupFilter(eventId);
    getScore(eventId);
    document.body.classList.add(cs.bodyBg);
  }
  componentWillUnmount() {
    document.body.classList.remove(cs.bodyBg);
  }
  setCurrentFilter = (field, e) => {
    if (field === "type") {
      console.log(e);
    } else {
      const value = e.target.value;
      const {currentFilter, setCurrentFilter} = this.props;
      const __obj = {...currentFilter, [field]: Number(value)};
      setCurrentFilter(__obj);
    }
  }
  render() {
    const {score, currentFilter, filters} = this.props;
    const currentType = filters.type.filter(item => item.value === currentFilter.type)[0];
    const currentStatus = filters.status.filter(item => item.value === currentFilter.status)[0];
    const title = currentType ? currentType.text : "";
    const status = currentStatus ? currentStatus.text : "";
    return (
      <div className={cs.box}>
        <NavBack title="比分"></NavBack>
        <div className={cs.pageTitle}>
          <CascadeFilter
            filters={filters.type}
            filterKeys={["group", "subGroup"]}
            onChange={this.setCurrentFilter.bind(this, "type")}
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
        <h3 className={cs.title}>{title}</h3>
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
    const {currentFilter: {type, status}} = this.props;
    if (!(item.type === type || type === 0)) return;
    if (!(item.status === status || status === 0)) return;
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
