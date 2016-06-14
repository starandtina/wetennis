import React from "react";
import TopNav from "components/TopNav";
import FullSelector from "components/FullSelector";
import Drawer from "material-ui/Drawer";
import MenuItem from 'material-ui/MenuItem';

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
        if (v.value === currentLocation) {
          currentFilterText = v.text;
          break;
        }
      }
    }
    return (
      <TopNav title="赛事列表">
        <div ref="left">
          <div onClick={this.showLocationSelector}>{currentFilterText}</div>
          <Drawer
            open={locationDisplay}
            docked={false}
            onRequestChange={this.hideLocationSelector}
          >
            {location.map((item, index) => {
              let active = false;
              if (item.value === currentLocation) {
                active = true;
              }
              return (
                <MenuItem
                  onClick={this.selectLocation.bind(this, item.value)}
                  key={index}
                  checked={active}
                >{item.text}</MenuItem>
              );
            })}
          </Drawer>
        </div>
        <div ref="right"></div>
      </TopNav>
    );
  }

  showLocationSelector = () => {
    this.setState({
      locationDisplay: true
    });
  }

  hideLocationSelector = () => {
    this.setState({
      locationDisplay: false
    });
  }

  selectLocation(v) {
    const {selectLocation} = this.props;
    selectLocation(v);
    this.setState({
      locationDisplay: false 
    });
  }
}
