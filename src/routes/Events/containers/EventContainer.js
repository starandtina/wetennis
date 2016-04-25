import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import EventList from "../components/EventList";
import {getEventList} from "../modules/eventList";

import EventFilter from "../components/EventFilter";

class EventContainer extends React.Component {
  constructor(props) {
    super(props);
    // get initial list data from server
    this.getList();
  }
  render() {
    const {eventList, action} = this.props;
    const {eventFilter} = this.state;
    return (
      <div>
        <EventFilter onChange={this.getList} current={eventFilter} />
        <EventList data={eventList} />
      </div>
    );
  }

  // initinal param
  state = {
    status: "ALL/REGISTERING/ASSIGN_DRAW/IN_PROGRESS/DONE",
    eventFilter: "ALL/RECOMMENDATION/ME",
    locationFilter: "CHENGDU/DEYANG/...",
    currentPage: 1,
    limit: 30
  }

  // get event list from server
  getList = param => {
    const {getEventList} = this.props.action;
    console.log(param);
    const newParam = Object.assign({}, this.state, param || {});
    console.log(newParam);
    if (param) {
      this.setState({ newParam });
    }
    getEventList(newParam);
  }
}

const mapStateToProps = state => {
  const {list, details} = state.events;
  return {eventList: list};
}

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({
    getEventList,
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventContainer)
