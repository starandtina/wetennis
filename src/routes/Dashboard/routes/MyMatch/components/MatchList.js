import React, {Component} from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import ScoreItem from "components/ScoreItem";

import cs from "./MatchList.scss";

export default class RankingTabs extends Component {
  componentDidMount() {
    document.body.classList.add(cs.bodyBg);
  }
  componentWillUnmount() {
    document.body.classList.remove(cs.bodyBg);
  }
  state = {
    totalwl: '',
    ytdwl: ''
  }
  changeTab = value => {
    const { data } = this.props;
    this.setState({
      totalwl: value == 1 ? data.single_totalwl : data.couple_totalwl,
      ytdwl: value == 1 ? data.single_ytdwl : data.couple_ytdwl
    })
  };
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
                {this.state.ytdwl || data.single_ytdwl}
                <span>今年 YTD</span>
              </div>
            </div>
            <div className={cs.wlTotal}>
              <div>
                {this.state.totalwl || data.single_totalwl}
                <span>总计 Total</span>
              </div>
            </div>
          </div>
        </div>
        <Tabs
          inkBarStyle={inkBarStyle}
          tabItemContainerStyle={tabItemContainerStyle}
          onChange={this.changeTab}
        >
          <Tab label="单打" value={1} style={TabStyle}>
            <RankingTabBody data={data.singleMatch} />
          </Tab>
          <Tab label="双打" value={2} style={TabStyle}>
            <RankingTabBody data={data.coupleMatch} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

class RankingTabBody extends Component {
  state = {
    MatchDisplay: {
      0: true
    }
  }
  showGameResult = (index) => {
    const { MatchDisplay } = this.state;
    let v = true;
    if (MatchDisplay[index]) {
      v = false;
    }
    this.setState({
      MatchDisplay: {...MatchDisplay, [index]: v}
    });
  }
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
            let open = false;
            const {MatchDisplay} = this.state;
            if (MatchDisplay[index]) {
              open = true;
            }
            return (
              <div key={index} className={`${cs.MatchBox} ${open ? cs.open : ""}`}>
                <div
                  className={cs.MatchTopBar}
                  onClick={this.showGameResult.bind(this, index)}
                >
                  <div className={cs.titleGroup}>
                    <div className={cs.matchTitle}>{item.title}</div>
                    <div className={cs.matchSubTitle}>{item.subtitle}</div>
                  </div>
                  <div className={cs.ptsGroup}>
                    <div className={cs.pts}>{item.pts}</div>
                    pts
                  </div>
                  <div className={cs.openIcon}>
                    {open
                    ? <i className="material-icons">expand_more</i>
                    : <i className="material-icons">expand_less</i>}
                  </div>
                </div>
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
