import React, {Component} from "react";
import NavBack from "components/NavBack";
import User from "components/User";
import {Link} from "react-router";

import cs from "./Rankings.scss";

export default class Rankings extends Component {
  componentDidMount() {
    const {getRankingsFilter, getRankings} = this.props;
    getRankingsFilter().then(({payload: {data}}) => {
      getRankings();
    });
    document.body.classList.add(cs.bodyBg);
  }
  componentWillUnmount() {
    document.body.classList.remove(cs.bodyBg);
  }
  render() {
    const {currentFilter, filters, rankings} = this.props;
    const currentFilterItem = filters.filter(item => item.value === currentFilter)[0];
    const title = currentFilterItem ? currentFilterItem.text : "";
    return (
      <div className={cs.box}>
        <NavBack title="排行"></NavBack>
        <div className={cs.pageTitle}>
          {title}
        </div>
        {rankings.map((item, index) => {
          return (
            <Link to={`rankings/${item.userid}`} className={cs.rankingItem}>
              <div className={cs.ranking}>{item.ranking}</div>
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
