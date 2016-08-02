import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Root from "../components/Rankings";
import {
  getRankings,
  getRankingsFilter,
  setCurrentFilter
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
  currentFilter, rankings, filters
}}) => ({
  currentFilter, rankings, filters
});

export default connect(
  mapStateToProps,
  {
    getRankings,
    getRankingsFilter,
    setCurrentFilter
  }
)(Container)
