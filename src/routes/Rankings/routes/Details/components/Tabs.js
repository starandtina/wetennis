import React, {Component} from "react";
import {Tabs, Tab} from 'material-ui/Tabs';
import ScoreItem from "components/ScoreItem";

import cs from "./Tabs.scss";

export default class RankingTabs extends Component {
  componentDidMount() {
    document.body.classList.add(cs.bodyBg);
  }
  componentWillUnmount() {
    document.body.classList.remove(cs.bodyBg);
  }
  render() {
    const {data, config} = this.props;
    return (
      <Tabs>
        <Tab label="单打" value={1}>
          {config.singleTab
          ? <RankingTabBody data={data.singleTab} />
          : undefined}
        </Tab>
        <Tab label="双打" value={2}>
          {config.doubleTab
          ? <RankingTabBody data={data.doubleTab} />
          : undefined}
        </Tab>
      </Tabs>
    );
  }
}

class RankingTabBody extends Component {
  state = {
    gameResultDisplay: {}
  }
  showGameResult = (index) => {
    const { gameResultDisplay } = this.state;
    let v = true;
    if (gameResultDisplay[index]) {
      v = false;
    }
    this.setState({
      gameResultDisplay: {...gameResultDisplay, [index]: v}
    });
  }
  render() {
    const {data} = this.props;
    const {latestMatch, gameResult} = data;
    return (
      <div className={cs.box}>
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
        {latestMatch
        ? (<div>
            <div className={cs.sectionTitle}>最新比赛</div>
            <div className={cs.matchTitle}>{latestMatch.title}</div>
            <div className={cs.matchSubTitle}>{latestMatch.subtitle}</div>
            {latestMatch.games.map(this.groupItem)}
          </div>)
        : undefined}
        {gameResult
        ? (<div>
            <div className={cs.sectionTitle}>比赛成绩</div>
            {gameResult.map((item, index) => {
              let open = false;
              const {gameResultDisplay} = this.state;
              if (gameResultDisplay[index]) {
                open = true;
              }
              return (
                <div key={index} className={`${cs.gameResultBox} ${open ? cs.open : ""}`}>
                  <div
                    className={cs.gameResultTopBar}
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
          </div>)
        : undefined}
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
