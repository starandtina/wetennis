import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {getEventList, getFilter} from "../modules/eventList";

import EventFilter from "../components/EventFilter";
import EventList from "../components/EventList";
import EventTopNav from "../components/EventTopNav";
import EventStatus from "../components/EventStatus";

import cs from "./EventContainer.scss";

class EventContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'ALL',
      eventFilter: "ALL",
      locationFilter: null,
      currentPage: 1,
      limit: 30
    };
    // get initial list data from server
    this.props.action.getFilter();
    this.getList();
  }
  render() {
    const {eventList, locationFilter, status, action, children} = this.props;
    const s = this.state;

    let content = (
      <div className={cs.container}>
        <button className="btn btn-default">123</button>
        <EventTopNav
          selectLocation={this.selectLocation}
          locationFilter={locationFilter}
          currentLocation={s.locationFilter}
        />
        <EventFilter
          onChange={this.getList}
          current={s.eventFilter}
        />
        <EventStatus
          selectStatus={this.selectStatus}
          currentStatus={s.status}
        />
        <EventList data={eventList} />
      </div>
    )

    if (children) {
      content = children
    }

    return (
      <div>
        {content}
      </div>
    )
  }

  selectStatus = _ => {
    this.getList({
      status: _
    });
  }

  selectLocation = _ => {
    this.getList({
      locationFilter: _
    });
  }

  componentWillReceiveProps(nextProps) {
    let s = this.state;
    if (s.locationFilter) return;
    const {locationFilter} = nextProps;
    if (locationFilter){
      this.setState({
        locationFilter: locationFilter[0]
      });
    }
  }

  // get event list from server
  getList = param => {
    const {getEventList} = this.props.action;
    const newParam = Object.assign({}, this.state, param || {});
    if (param) {
      this.setState({
        ...newParam
      });
    }
    getEventList({
      ...newParam,
      locationFilter: newParam.locationFilter ? newParam.locationFilter.value : "ALL",
    });
  }
}

const mapStateToProps = state => {
  const {list, details, locationFilter, status} = state.events;
  return {
    eventList: list,
    eventDetails: details,
    locationFilter,
    status
  };
}

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({
    getEventList,
    getFilter
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventContainer)
