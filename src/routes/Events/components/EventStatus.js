import React from "react";

import cs from "./EventStatus.scss";

export default class EventStatus extends React.Component {
  render() {
    const {currentStatus, status} = this.props;
    let text = "全部";
    for (let i = 0, l = status.length; i < l; i++) {
      let v = status[i];
      if (v.value === currentStatus) {
        text = v.text;
        break;
      }
    }
    return (
      <div className={cs.container}>
        <span>
          {text}
          <i className="material-icons">keyboard_arrow_down</i>
          <select
            className="dropdown"
            value={currentStatus || 0}
            onChange={this.selectStatus}
          >
            {status.map((item, index) => {
              return (
                <option key={index} value={item.value}>{item.text}</option>
              );
            })}
          </select>
        </span>
      </div>
    );
  }

  selectStatus = (e) => {
    const {selectStatus} = this.props;
    selectStatus(e.target.value);
  }
}
