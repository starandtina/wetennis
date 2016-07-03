import React, {Component} from "react";
import NavBack from "components/NavBack";
import ScoreItem from "components/ScoreItem";

import cs from "./EventScore.scss";

export default class EventScore extends Component {
  componentDidMount() {
    const {
      getFilter, getScore,
      params: {eventId}
    } = this.props;
    getFilter(eventId);
    getScore(eventId);
  }
  setCurrentFilter = (field, e) => {
    const value = e.target.value >> 0;
    const {currentFilter, setCurrentFilter} = this.props;
    const __obj = {...currentFilter, [field]: value};
    setCurrentFilter(__obj);
  }
  render() {
    const {score, currentFilter, filters} = this.props;
    return (
      <div className={cs.box}>
        <NavBack title="比分">
          <i className="material-icons">more_vert</i>
        </NavBack>
        <div>
          <select
            defaultValue={currentFilter.status}
            onChange={this.setCurrentFilter.bind(this, "status")}
          >
          {filters.status.map((item, index) => {
            return <option key={index} value={item.value}>{item.text}</option>
          })}
          </select>
        </div>
        {score.map((item, index) => {
          return (
            <div key={index}>
              <div>{item.group}</div>
              {item.list.map(this.groupItem)}
            </div>
          );
        })}
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
    return (
      <div key={index} className={cs.groupItem}>
        <div className={cs.groupNumber}>{`第${index + 1}组`}</div>
        <div className={cs.groupInfo}>
          <div className={cs.matches}>
            {item.matches}
          </div>
          {item.gameTime}
        </div>
        {item.team.map(this.team)}
      </div>
    );
  }
}
