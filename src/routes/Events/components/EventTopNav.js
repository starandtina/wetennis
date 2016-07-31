import React from "react";
import TopNav from "components/TopNav";
import FullSelector from "components/FullSelector";
import Drawer from "material-ui/Drawer";
import MenuItem from 'material-ui/MenuItem';

import cs from "./EventTopNav.scss";

export default class EventTopNav extends React.Component {
  state = {
    locationDisplay: false
  }
  render() {
    let {location, currentLocation} = this.props;
    const {locationDisplay} = this.state;
    currentLocation = currentLocation || {};
    let currentFilterText = "";
    if (location.length > 0) {
      for (let i = 0, l = location.length; i < l; i++) {
        let v = location[i];
        if (v.value === Number(currentLocation)) {
          currentFilterText = v.text;
          break;
        }
      }
    }
    return (
      <TopNav title="赛事列表">
        <div ref="left">
          <div className={cs.leftButton}>
            <i className="material-icons">place</i>
            {currentFilterText}
            <select
              className="dropdown"
              onChange={this.selectLocation.bind(this)}
            >
              {location.map((item, index) => {
                return (
                  <option key={index} value={item.value}>{item.text}</option>
                );
              })}
            </select>
          </div>
        </div>
        <div ref="right"></div>
      </TopNav>
    );
  }

  selectLocation(e) {
    const v = e.target.value;
    const {selectLocation} = this.props;
    selectLocation(v);
  }
}
