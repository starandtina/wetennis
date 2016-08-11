import React, {Component} from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import ScoreItem from "components/ScoreItem";

import cs from "./MatchList.scss";

export default class RankingTabs extends Component {
  componentDidMount() {
    const { MyPractice, userId, fetchMyPractice } = this.props;
    document.body.classList.add(cs.bodyBg);
    fetchMyPractice({
      userId
    })
  }
  componentWillUnmount() {
    document.body.classList.remove(cs.bodyBg);
  }
  render() {
    const { data } = this.props;
    const TabStyle = {
      color: '#929292'
    }
    const inkBarStyle = {
      backgroundColor: '#1cca5a'
    }
    const tabItemContainerStyle = {
      backgroundColor: '#f5f5f5',
      color: '#929292'
    }
    return (
      <div>
        <div>
          <div className={cs.sectionTitle}>胜负比 Win/Loss</div>
          <div className={cs.wlInfo}>
            <div className={cs.wlYtd}>
              <div>
                {data.ytdwl}
                <span>今年 YTD</span>
              </div>
            </div>
            <div className={cs.wlTotal}>
              <div>
                {data.totalwl}
                <span>总计 Total</span>
              </div>
            </div>
          </div>
        </div>
        <Tabs inkBarStyle={inkBarStyle} tabItemContainerStyle={tabItemContainerStyle}>
          <Tab label="单打" value={1} TabStyle={TabStyle}>
            <RankingTabBody data={data.singlePractice} />
          </Tab>
          <Tab label="双打" value={2} TabStyle={TabStyle}>
            <RankingTabBody data={data.couplePractice} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

class RankingTabBody extends Component {

  render() {
    const { data: singleMatch } = this.props;
    if (!singleMatch) {
      return <div></div>;
    }
    return (
      <div className={cs.box}>
        <div>
          <div className={cs.sectionTitle}>比赛成绩</div>
          {singleMatch.map((item, index) => {
            return (
              <div key={index} className={`${cs.MatchBox} ${cs.open}`}>
                {item.games.map(this.groupItem)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  groupItem = (item, index) => {
    return (
      <div key={index} className={cs.groupItem}>
        <div className={cs.groupInfo}>
          <div className={cs.matches}>{item.matches}</div>
          {item.gameTime}
        </div>
        {item.teams.map(this.team)}
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
        <div className={`${cs.teamItem} ${cs.score}`}>
          {item.score}
        </div>
        <div className={`${cs.teamItem} ${item.win ? cs.win : cs.lose}`}>
          <i className="material-icons">done</i>
        </div>
      </ScoreItem>
    );
  }
}
