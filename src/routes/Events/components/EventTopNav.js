import React from "react";
import TopNav from "components/TopNav";
import FullSelector from "components/FullSelector";

export default class EventTopNav extends React.Component {
  state = {
    locationDisplay: false
  }
  render() {
    let {location, currentLocation} = this.props;
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
          <FullSelector
            show={this.state.locationDisplay}
            align="left"
            onChange={this.selectLocation}
            data={location}
            selected={currentLocation}
          />
        </div>
        <div ref="right"></div>
      </TopNav>
    );
  }

  showLocationSelector = _ => {
    this.setState({
      locationDisplay: true
    });
  }

  selectLocation = item => {
    const {selectLocation} = this.props;
    selectLocation && selectLocation(item.value);
    this.setState({
      locationDisplay: false 
    });
  }
}
