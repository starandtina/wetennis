import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {getEventList, getFilter, setCurrentFilter} from "../modules/eventList";

import EventFilter from "../components/EventFilter";
import EventList from "../components/EventList";
import EventTopNav from "../components/EventTopNav";
import EventStatus from "../components/EventStatus";
import Footer from "components/Footer";

import cs from "./EventContainer.scss";

class EventContainer extends React.Component {
  componentDidMount () {
    const {children, eventList, action: {getFilter, getEventList, setCurrentFilter}, currentFilter} = this.props;
    // get initial list data from server
    if (!children || eventList.length === 0) {
      getFilter().then(data => {
        const {status, location} = data.payload.data;
        const __obj = Object.assign({}, currentFilter, {
          status: status[0].value,
          location: location[0].value,
        });
        setCurrentFilter(__obj);
        getEventList(__obj);
      });
    }
  }
  render () {
    const { eventList, location, status, action, children, currentFilter } = this.props;
    const s = currentFilter;

    let content = (
      <div className={cs.container}>
        <EventTopNav
          selectLocation={this.setCurrentFilter.bind(this, "location")}
          location={location}
          currentLocation={s.location}
        />
        <EventFilter
          onChange={this.setCurrentFilter.bind(this, "eventFilter")}
          current={s.eventFilter}
        />
        <EventStatus
          selectStatus={this.setCurrentFilter.bind(this, "status")}
          status={status}
          currentStatus={s.status}
        />
        <EventList data={eventList} />
        <Footer activeNavTab='EVENTS' />
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

  setCurrentFilter(key, value) {
    let {action: {setCurrentFilter, getEventList}, currentFilter} = this.props;
    const filter = Object.assign({}, currentFilter, {
      [key]: value
    });
    setCurrentFilter(filter);
    getEventList(filter);
  }
}

const mapStateToProps = state => {
  const {list, details, location, status, currentFilter} = state.events;
  return {
    eventList: list,
    eventDetails: details,
    location,
    status,
    currentFilter
  };
}

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({
    getEventList,
    getFilter,
    setCurrentFilter,
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventContainer)
