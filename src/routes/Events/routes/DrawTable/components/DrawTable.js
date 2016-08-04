import React, {Component} from "react";
import TopNav from "components/TopNav";
import NavBack from "components/NavBack";

import TableDetails from "./TableDetails";
import QualifyTableDetails from "./QualifyTableDetails";
import cs from "./DrawTable.scss";

export default class DrawTable extends Component {
  componentDidMount() {
    const {
      getFilter,
      params: {eventId}
    } = this.props;
    getFilter(eventId).then((data) => {
      this.getDrawTable()
    });
  }
  getDrawTable(matchId) {
    const {
      getDrawTable,
      setCurrentMatch,
      currentFilter,
      params: {eventId}
    } = this.props
    if (matchId) {
      setCurrentMatch(matchId)
    }
    getDrawTable({eventId, matchId, type: currentFilter})
  }

  setCurrentFilter = (e) => {
    const value = e.target.value;
    const {setCurrentFilter, currentMatch, getDrawTable, params: {eventId}} = this.props;
    setCurrentFilter(value)
    getDrawTable({eventId, currentMatch, type: value})
  }

  render() {
    const {data, currentMatch, filters, currentFilter} = this.props;
    const {qualify, gameName} = data;
    return (
      <div>
        <NavBack caption="签表">
          <div className={cs.typeFilter}>
            <i className="material-icons">more_vert</i>
            <select
              className="dropdown"
              defaultValue={currentFilter}
              onChange={this.setCurrentFilter}
            >
            {filters.map((item, index) => {
              return <option
                      key={index}
                      value={item.value}
                    >{item.text}</option>
            })}
            </select>
          </div>
        </NavBack>
        <div className={cs.tab}>
          <div className={cs.tabInnerbox}>
            <ul>
            {data.matchs.map((item, index) => {
              let current = false;
              if (item.id === currentMatch) {
                current = true;
              }
              return (
                <li
                  className={current ? cs.active : ""}
                  onClick={this.getDrawTable.bind(this, item.id)}
                  key={index}
                >{item.text}</li>
              );
            })}
            </ul>
          </div>
        </div>
        <div className={cs.gameName}>{gameName}</div>
        {qualify
        ? <QualifyTableDetails data={data.details} />
        : <TableDetails data={data.details} />}
      </div>
    );
  }
}
