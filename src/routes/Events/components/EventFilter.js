import React from "react";
import cs from "./EventFilter.scss";

export default class EventFilter extends React.Component {
  render() {
    const {current} = this.props;
    return (
      <div className={cs.container}>
        <div
          className={`${current === "ALL" ? cs["item-active"] : cs.item}`}
          onClick={this.eventFilter.bind(this, "ALL")}
        >所有赛事</div>
        <div
          className={`${current === "RECOMMENDATION" ? cs["item-active"] : cs.item}`}
          onClick={this.eventFilter.bind(this, "RECOMMENDATION")}
        >推荐赛事</div>
        <div
          className={`${current === "ME" ? cs["item-active"] : cs.item}`}
          onClick={this.eventFilter.bind(this, "ME")}
        >我的赛事</div>
      </div>
    );
  }
  
  eventFilter(filter) {
    const {onChange} = this.props;
    onChange(filter);
  }
}
