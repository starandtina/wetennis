import React, {Component} from "react";
import TopNav from "components/TopNav";
import User from "components/User";
import {Link} from "react-router";
import CascadeFilter from "components/CascadeFilter";
import Footer from "components/Footer";

import cs from "./Rankings.scss";

export default class Rankings extends Component {
  componentDidMount() {
    const {getRankingsFilter, getRankings, getRankingType} = this.props;
    getRankingType().then((res) => {
      const {currentRankingType} = this.props;
      getRankingsFilter(currentRankingType);
    });
    document.body.classList.add(cs.bodyBg);
  }
  componentWillUnmount() {
    document.body.classList.remove(cs.bodyBg);
  }
  setCurrentFilter = ({filter}) => {
    const {setCurrentFilter, getRankings, currentRankingType} = this.props;
    setCurrentFilter(filter);
    getRankings(filter, currentRankingType);
  }
  setCurrentRankingType = (e) => {
    const {setCurrentRankingType, getRankingsFilter} = this.props;
    const v = e.target.value;
    setCurrentRankingType(v);
    getRankingsFilter(v).then((res) => {
      const {currentFilter, getRankings} = this.props;
      getRankings(currentFilter, v);
    });
  }
  render() {
    const {filters, rankings, currentRankingType, rankingType} = this.props;
    return (
      <div className={cs.box}>
        <TopNav title="排行">
          <div ref="left" />
          <div ref="right" className={cs.titleFilter}>
            <i className="material-icons">more_vert</i>
            <select
              className="dropdown"
              value={currentRankingType}
              onChange={this.setCurrentRankingType}
            >
            {rankingType.map((item, index) => {
              return <option
                      key={index}
                      value={item.value}
                    >{item.text}</option>
            })}
            </select>
          </div>
        </TopNav>
        <div className={cs.pageTitle}>
          <CascadeFilter
            className={cs.groupFilter}
            filters={filters}
            filterKeys={["group", "filter"]}
            onChange={this.setCurrentFilter}
          />
        </div>
        {rankings.length === 0
        ? <div className={cs.noData}>暂时没有排行数据</div>
        : undefined}
        {rankings.map((item, index) => {
          return (
            <Link
              key={index}
              to={`/rankings/${currentRankingType}/user/${item.userid}`}
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
        <Footer activeNavTab='RANKINGS' />
      </div>
    );
  }
}
