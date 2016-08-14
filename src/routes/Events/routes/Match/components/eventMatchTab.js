import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import CommentsComponent from "components/Comments";
import MatchTechnicalStatistics from "./eventMatchTechnicalStatistics";
import EventMatchGuess from "./eventMatchGuess";
import cs from "./eventMatchTab.scss";

export default class MatchTab extends Component {
  render() {
    const {
      matchId, comments, technicalStatistics, guess,
      likeComment, sendComment} = this.props;
    return (
      <Tabs>
        <Tab label="技术统计">
          <MatchTechnicalStatistics data={technicalStatistics} />
        </Tab>
        <Tab label="竞猜">
          <EventMatchGuess data={guess} />
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

