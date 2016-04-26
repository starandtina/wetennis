import React from "react";
import cs from "./EventFilter.scss";

export default class EventFilter extends React.Component {
  render() {
    return (
      <div className={cs.container}>
        <div
          className={cs["item-active"]}
          onClick={this.eventFilter.bind(this, "ALL")}
        >所有赛事</div>
        <div
          className={cs.item}
          onClick={this.eventFilter.bind(this, "RECOMMENDATION")}
        >推荐赛事</div>
        <div
          className={cs.item}
          onClick={this.eventFilter.bind(this, "ME")}
        >我的赛事</div>
      </div>
    );
  }
  
  eventFilter(filter) {
    const {onChange} = this.props;
    onChange({
      eventFilter: filter
    });
  }
}
