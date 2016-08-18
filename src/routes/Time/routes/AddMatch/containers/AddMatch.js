import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import style from './AddMatch.scss';

const mapStateToProps = (state) => ({
  time: state.time
});

const mapDispatchToProps = ({
  push
})

class AddMatch extends Component {
  render() {
    return (
      <div>Addmatch</div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMatch)
