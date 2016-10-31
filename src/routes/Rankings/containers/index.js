import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Root from "../components/Rankings";
import {
  getRankings,
  getRankingsFilter,
  setCurrentFilter,
  getRankingType,
  setCurrentRankingType,
} from "../modules";

class Container extends Component {
  render() {
    const {children, ...props} = this.props;
    let content;
    if (children) {
      content = children;
    } else {
      content = <Root {...props} />;
    }
    return (
      <div>{content}</div>
    );
  }
}

const mapStateToProps = ({eventRankings: {
  currentFilter, rankings, filters, currentRankingType, rankingType
}}) => ({
  currentFilter, rankings, filters, currentRankingType, rankingType
});

export default connect(
  mapStateToProps,
  {
    getRankings,
    getRankingsFilter,
    setCurrentFilter,
    getRankingType,
    setCurrentRankingType,
  }
)(Container)
