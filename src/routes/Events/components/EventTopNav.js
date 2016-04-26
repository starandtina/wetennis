import React from "react";
import TopNav from "components/TopNav";

export default class EventTopNav extends React.Component {
  render() {
    return (
      <TopNav title="赛事">
        <div ref="left">left</div>
        <div ref="right">right</div>
      </TopNav>
    );
  }
}
