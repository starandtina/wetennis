import React from 'react'

export default class EventInfo extends React.Component {
  render() {
    const {
      thumb,
      name,
      startDate,
      endDate,
      banner,
      location
    } = this.props.data;
    return (
      <div>
        <div>
          <img src={banner} alt="" />
        </div>
        <div>
          <img src={thumb} alt="" />
        </div>
        <div>
          {`startDate: ${startDate}`}
        </div>
        <div>
          {`endDate: ${endDate}`}
        </div>
        <div>
          {`name: ${name}`}
        </div>
        <div>
          {`location: ${location}`}
        </div>
      </div>
    );
  }
}
