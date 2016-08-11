import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import CommentsComponent from "components/Comments";
import cs from "./eventMatchTab.scss";

export default class MatchTab extends Component {
  render() {
    const {matchId, comments, likeComment, sendComment} = this.props;
    return (
      <Tabs>
        <Tab label="技术统计">
          <div>技术统计1</div>
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

