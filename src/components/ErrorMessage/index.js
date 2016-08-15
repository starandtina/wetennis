import React, { Component } from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { errorHide } from "store/modules";
import cs from "./ErrorMessage.scss";

class ErrorMessage extends Component {
  render() {
    const {data, errorHide} = this.props;
    return (
      <div onClick={errorHide} className={cs.box}>
        <i className={`material-icons ${cs.icon}`}>error</i>
        <div className={cs.text}>{data}</div>
        <i className={`material-icons ${cs.icon}`}>clear</i>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => (bindActionCreators({
  errorHide
}, dispatch));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorMessage);

