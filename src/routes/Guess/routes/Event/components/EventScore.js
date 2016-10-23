import React, {Component} from "react";
import NavBack from "components/NavBack";
import ScoreItem from "components/ScoreItem";
import {Link} from "react-router";

import cs from "./EventScore.scss";

export default class EventScore extends Component {
  componentDidMount() {
    const {
      getGuessEventInfo,
      getGuessEventFilter,
      params: {eventId}
    } = this.props;
    getGuessEventInfo(eventId);
    getGuessEventFilter(eventId);
    document.body.classList.add(cs.bodyBg);
  }
  componentWillUnmount() {
    document.body.classList.remove(cs.bodyBg);
  }
  setCurrentFilter = (field, e) => {
    const value = e.target.value
    const {currentFilter, setCurrentFilter, setSubGroupFilter, eventFilter} = this.props
    const __obj = {...currentFilter, [field]: value}
    if (field === "group") {
      let hasChild = false
      for (let i = 0; i < eventFilter.length; i++) {
        let v = eventFilter[i]
        if (v.value == value && Array.isArray(v.children) && v.children[0]) {
          hasChild = true
          __obj["subGroup"] = v.children[0].value
          setSubGroupFilter(v.children)
          break
        }
      }

      if (!hasChild) {
        __obj["subGroup"] = ""
        setSubGroupFilter([])
      }
    }
    setCurrentFilter(__obj)
  }
  getCurrentFilterText = () => {
    const {currentFilter: {group, subGroup}, eventFilter} = this.props;
    let eventFilterText = "";
    let childrenText = "";
    let childrenFilter = [];

    for (let i = 0, l = eventFilter.length; i < l; i++) {
      let v = eventFilter[i];
      if (v.value == group) {
        eventFilterText = v.text;
        if (Array.isArray(v.children)) {
          childrenFilter = v.children;
        }
        break;
      }
    }

    for (let i = 0, l = childrenFilter.length; i < l; i++) {
      let v = childrenFilter[i];
      if (v.value == subGroup) {
        childrenText = v.text;
        break;
      }
    }
    return {
      groupText: eventFilterText,
      subGroupText: childrenText
    }
  }
  render() {
    const {
      eventInfo: {games, eventDetail},
      eventFilter, currentFilter, subGroupFilter
    } = this.props
    const filterText = this.getCurrentFilterText()
    const filters = {status: []}
    return (
      <div className={cs.box}>
        <NavBack routes={this.props.routes} title="赛事">
          <div className={cs.typeFilter}>
            <i className="material-icons">more_vert</i>
            <select
              className="dropdown"
              value={currentFilter.eventFilter}
              onChange={this.setCurrentFilter.bind(this, "group")}
            >
            {eventFilter.map((item, index) => {
              return <option
                      key={index}
                      value={item.value}
                    >{item.text}</option>
            })}
            </select>
          </div>
        </NavBack>
        <div className={cs.pageTitle}>
          <h3 className={cs.title}>{`${filterText.groupText}${filterText.subGroupText ? " - "+filterText.subGroupText : ""}`}</h3>
          {subGroupFilter && subGroupFilter.length > 0
          ? <div className={cs.statusFilter}>
              {filterText.subGroupText}
              <i className="material-icons">keyboard_arrow_down</i>
              <select
                className="dropdown"
                value={currentFilter.subGroup}
                onChange={this.setCurrentFilter.bind(this, "subGroup")}
              >
              {subGroupFilter.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item.value}
                  >{item.text}</option>
                )
              })}
              </select>
            </div>
          : undefined}
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
      <Link to={`/events/match/${item.id}`} key={index} className={cs.groupItem}>
        <div className={cs.groupInfo}>
          <div className={cs.matches}>{item.matches}</div>
          {item.gameTime}
        </div>
        {item.team.map(this.team)}
      </Link>
    );
  }
}
