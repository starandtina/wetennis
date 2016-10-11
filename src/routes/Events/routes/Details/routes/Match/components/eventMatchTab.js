import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import CommentsContainer from "components/Comments/CommentsContainer";
import MatchTechnicalStatistics from "./eventMatchTechnicalStatistics";
// import EventMatchGuess from "./eventMatchGuess";
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
        {/*<Tab label="竞猜">
          <EventMatchGuess data={guess} />
        </Tab>*/}
        <Tab label="评论">
          <CommentsContainer type="match" id={matchId} />
        </Tab>
      </Tabs>
    );
  }
}

