import React, {Component} from "react";
import TopNav from "components/TopNav";
import NavBack from "components/NavBack";

import TableDetails from "./TableDetails";
import QualifyTableDetails from "./QualifyTableDetails";
import cs from "./DrawTable.scss";

export default class DrawTable extends Component {
  componentDidMount() {
    this.getDrawTable();
  }
  getDrawTable(matchId) {
    const {
      getDrawTable,
      setCurrentMatch,
      params: {eventId}
    } = this.props;
    if (matchId) {
      setCurrentMatch(matchId);
    }
    getDrawTable({eventId, matchId});
  }
  render() {
    const {data, currentMatch} = this.props;
    const {qualify, gameName} = data;
    return (
      <div>
        <NavBack title="签表">
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
