import React, {Component} from "react";
import {Tabs, Tab} from 'material-ui/Tabs';

export default class RankingTabs extends Component {
  render() {
    return (
      <Tabs>
        <Tab label="单打" value={1}>
          <div>1</div>
        </Tab>
        <Tab label="双打" value={2}>
          <div>2</div>
        </Tab>
      </Tabs>
    );
  }

}
