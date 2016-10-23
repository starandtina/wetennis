import React, {Component} from "react";
import NavBack from "components/NavBack";
import User from "components/User";
import {Link} from "react-router";
import CascadeFilter from "components/CascadeFilter";

import cs from "./Rankings.scss";

export default class Rankings extends Component {
  componentDidMount() {
    const {getRankingsFilter, getRankings} = this.props;
    getRankingsFilter();
    document.body.classList.add(cs.bodyBg);
  }
  componentWillUnmount() {
    document.body.classList.remove(cs.bodyBg);
  }
  setCurrentFilter = ({filter}) => {
    const {setCurrentFilter, getRankings} = this.props;
    setCurrentFilter(filter);
    getRankings(filter);
  }
  render() {
    const {filters, rankings, params: {eventId}} = this.props;
    return (
      <div className={cs.box}>
        <NavBack routes={this.props.routes} title="排行" />
        <div className={cs.pageTitle}>
          <CascadeFilter
            className={cs.groupFilter}
            filters={filters}
            filterKeys={["group", "filter"]}
            onChange={this.setCurrentFilter}
          />
        </div>
        {rankings.map((item, index) => {
          return (
            <Link
              key={index}
              to={`/rankings/${item.userid}`}
              className={cs.rankingItem}
            >
              <div className={`${cs.ranking} ${index < 3 ? cs.highlight : ""}`}>{index + 1}</div>
              <div className={cs.rankingInfo}>
                <User data={item} className={cs.user} />
                <div className={cs.pts}>
                  {item.pts}
                  <div>PTS</div>
                </div>
                <i className={`material-icons ${cs.more}`}>keyboard_arrow_right</i>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}
