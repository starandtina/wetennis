import React from 'react'
import {Link} from "react-router";
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

  componentWillUnmount() {
    clearInterval(this.__timer);
  }
  
  render() {
    const {
      thumb,
      name,
      startDate,
      endDate,
      banner,
      location,
      state
    } = this.props.data;
    const eventId = this.props.eventId
    const {countdown} = this.state

    let fc = {}
    if ([1,2,3].indexOf(Number(state)) !== -1) {
      fc = this.formatCountdown(countdown)
    } else if (this.__timer) {
      clearInterval(this.__timer)
      this.__timer = false
    }

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
            <i className={`material-icons ${cs.icons}`}>place</i>
            <span>
              {location}
            </span>
          </div>
          <div className={`${cs.time}`}>
            <i className={`material-icons ${cs.icons}`}>access_time</i>
            <span>{`${startDate} -`}<br />{`${endDate}`}</span>
          </div>
        </div>
        {[1,2,3].indexOf(Number(state)) === -1
        ? <div className={cs.started}>
            {[4,5,6].indexOf(Number(state)) !== -1
            ? <Link
                to={`/events/${eventId}/drawTable`}
                className={`${cs.startedCol} ${cs.startedActive}`}
              >
                <i className="material-icons">today</i>
                <div>签表</div>
              </Link>
            : <div className={`${cs.startedCol}`}>
                <i className="material-icons">today</i>
                <div>签表</div>
              </div>
            }
            
            {[5,6].indexOf(Number(state)) !== -1
            ? <Link
                to={`/events/${eventId}/schedule`}
                className={`${cs.startedCol} ${cs.startedActive}`}
              >
                <i className="material-icons">today</i>
                <div>赛程</div>
              </Link>
            : <div className={`${cs.startedCol}`}>
                <i className="material-icons">today</i>
                <div>赛程</div>
              </div>
            }

            {[6].indexOf(Number(state)) !== -1
            ? <Link
                to={`/events/${eventId}/score`}
                className={`${cs.startedCol} ${cs.startedActive}`}
              >
                <i className="material-icons">today</i>
                <div>比分</div>
              </Link>
            : <div className={`${cs.startedCol}`}>
                <i className="material-icons">today</i>
                <div>比分</div>
              </div>
            }
          </div>
        : <div className={`${cs.countdown}`}>
            {fc.day}<i>天</i>{fc.hour}<i>小时</i>{fc.minute}<i>分</i>{fc.second}<i>秒</i>
          </div>}
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
