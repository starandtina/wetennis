import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

import Root from "../components/Guess";
import {
  getGuessEvents
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

const mapStateToProps = ({guess: {
  guessEvents
}}) => ({
  guessEvents
});

export default connect(
  mapStateToProps,
  {
    getGuessEvents
  }
)(Container)
