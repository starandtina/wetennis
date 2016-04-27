import React from "react";
import TopNav from "components/TopNav";
import FullSelector from "components/FullSelector";

export default class EventTopNav extends React.Component {
  state = {
    locationFilterDisplay: false
  }
  render() {
    let {locationFilter, currentLocation} = this.props;
    currentLocation = currentLocation || {};
    return (
      <TopNav title="赛事列表">
        <div ref="left">
          <div onClick={this.showLocationSelector}>
            {currentLocation['text']}
          </div>
          <FullSelector
            show={this.state.locationFilterDisplay}
            align="left"
            onChange={this.selectLocation}
            data={locationFilter}
            selected={currentLocation}
          />
        </div>
        <div ref="right"></div>
      </TopNav>
    );
  }

  showLocationSelector = _ => {
    this.setState({
      locationFilterDisplay: true
    });
  }

  selectLocation = item => {
    const {selectLocation} = this.props;
    selectLocation && selectLocation(item);
    this.setState({
      locationFilterDisplay: false 
    });
  }
}
