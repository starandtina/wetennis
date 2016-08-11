import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import CommentsComponent from "components/Comments";
import cs from "./eventMatchTab.scss";

export default class MatchTab extends Component {
  render() {
    const {
      matchId, comments, technicalStatistics,
      likeComment, sendComment} = this.props;
    return (
      <Tabs>
        <Tab label="技术统计">
          <ul className={cs.technicalList}>
            {technicalStatistics.map((item, index) => {
              const percent = item.title.indexOf("率") !== -1;
              const total = item.team1 + item.team2;
              const leftPercent = Math.floor(item.team1 / total * 100);
              const rightPercent = Math.floor(item.team2 / total * 100);
              return (
                <li key={index}>
                  <div className={cs.technicalText}>
                    {percent ? `${item.team1}/${total} (${leftPercent})%` : item.team1}
                    <div className={cs.technicalTitle}>{item.title}</div>
                    {percent ? `${item.team2}/${total} (${rightPercent})%` : item.team2}
                  </div>
                  <div className={cs.technicalBar}>
                    <div style={{width: `${leftPercent}%`}} className={cs.technicalTeam1Bar}></div>
                    <div style={{width: `${rightPercent}%`}} className={cs.technicalTeam2Bar}></div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Tab>
        <Tab label="竞猜">
          <div>技术统计2</div>
        </Tab>
        <Tab label="评论">
          {comments && comments.total !== -1 && comments.comments.length > 0
          ? <div className={cs.comments}>
              <div className={cs.commentsTitle}>
                {`评论 ${comments.total}`}
              </div>
              <CommentsComponent
                groupId={matchId}
                data={comments.comments}
                likeAction={likeComment}
                sendAction={sendComment}
              />
            </div>
          : undefined}
        </Tab>
      </Tabs>
    );
  }
}

