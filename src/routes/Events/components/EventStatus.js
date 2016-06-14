import React from "react";

import cs from "./EventStatus.scss";

const statusData = [
  {text: "全部", value: "ALL"},
  {text: "正在报名", value: "REGISTRATION"},
  {text: "分配签表", value: "DRAW"},
  {text: "正在进行", value: "IN_PROGRESS"},
  {text: "已完成", value: "COMPLETED"},
]

export default class EventStatus extends React.Component {
  render() {
    const {currentStatus, status} = this.props;
    return (
      <div className={cs.container}>
        <select
          value={currentStatus || "ALL"}
          onChange={this.selectStatus}
        >
          {status.map((item, index) => {
            return (
              <option key={index} value={item.value}>{item.text}</option>
            );
          })}
        </select>
      </div>
    );
  }

  selectStatus = (e) => {
    const {selectStatus} = this.props;
    selectStatus(e.target.value >> 0);
  }
}
