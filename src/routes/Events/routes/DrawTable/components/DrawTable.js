import React, {Component} from "react";
import TopNav from "components/TopNav";
import NavBack from "components/NavBack";
import CascadeFilter from "components/CascadeFilter";

import TableDetails from "./TableDetails";
import QualifyTableDetails from "./QualifyTableDetails";
import cs from "./DrawTable.scss";

export default class DrawTable extends Component {
  componentDidMount() {
    const {
      getFilter,
      setCurrentFilter,
      params: {eventId}
    } = this.props;
    document.body.classList.add(cs.bodyBg);
    getFilter(eventId);
  }
  componentWillUnmount() {
    document.body.classList.remove(cs.bodyBg);
  }
  getDrawTable(matchId) {
    const {
      getDrawTable,
      setCurrentMatch,
      currentFilter: {itemId},
      params: {eventId}
    } = this.props
    if (matchId) {
      setCurrentMatch(matchId)
    }
    getDrawTable({itemId, round: matchId})
  }

  setCurrentFilter = ({group, itemId}) => {
    const {setCurrentFilter, currentMatch, getDrawTable} = this.props;
    setCurrentFilter({group, itemId});
    getDrawTable({itemId, round: currentMatch});
  }

  render() {
    const {data, currentMatch, filters, currentFilter} = this.props;
    const {qualify, gameName} = data;
    return (
      <div>
        <NavBack caption="签表">
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
        <div className={cs.gameName}>
          <CascadeFilter
            filters={filters}
            filterKeys={['group', 'itemId']}
            onChange={this.setCurrentFilter}
          />
        </div>
        {qualify
        ? <QualifyTableDetails data={data.details} />
        : <TableDetails data={data.details} />}
      </div>
    );
  }
}
