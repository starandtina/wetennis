import React from 'react'

import cs from "./EventInfo.scss";

export default class EventInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const stateCountdown = this.state.countdown;
    const {countdown} = nextProps.data;
    if (stateCountdown === false && countdown) {
      this.setState({
        countdown: countdown 
      });
      this.__timer = setInterval(() => {
        let {countdown} = this.state;
        countdown -= 1000;
        if (countdown >= 0) {
          this.setState({countdown});
        } else {
          clearInterval(this.__timer);
        }
      }, 1000);
    }
  }
  render() {
    const {
      thumb,
      name,
      startDate,
      endDate,
      banner,
      location,
    } = this.props.data;
    const {countdown} = this.state;

    const fc = this.formatCountdown(countdown);
    return (
      <div>
        <div className={`${cs.banner}`}>
          <img className={`${cs.bannerImg}`} src={banner} alt="" />
          <img className={`${cs.thumb}`} src={thumb} alt="" />
          <div className={`${cs.name}`}>
            <span>{`${name}`}</span>
          </div>
        </div>
        <div className={`${cs.midInfo}`}>
          <div className={`${cs.location}`}>
            <span>
              {location}
            </span>
          </div>
          <div className={`${cs.time}`}>
            <span>
              {`${startDate} - ${endDate}`}
            </span>
          </div>
        </div>
        <div className={`${cs.countdown}`}>
          {fc.day}<i>天</i>{fc.hour}<i>小时</i>{fc.minute}<i>分</i>{fc.second}<i>秒</i>
        </div>
      </div>
    );
  }

  formatCountdown (v) {
    if (!v) return {day:0, hour: 0, minute: 0, second: 0};
    const s = 1000;
    const m = 60*s;
    const h = 60*m;
    const d = 24*h;
    let left = v;
    const day = Math.floor(left/d);
    left -= day*d;
    const hour = Math.floor(left/h);
    left -= hour*h;
    const minute = Math.floor(left/m);
    left -= minute*m;
    const second = Math.floor(left/s);

    return {day, hour, minute, second};
  }
}
