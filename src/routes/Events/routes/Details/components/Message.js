import React from "react";
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import cs from "./Message.scss";
import variables from "utils/variables.js";

const buttonStyle = {
  height: `${variables.px1 * 32}rem`,
  lineHeight: `${variables.px1 * 32}rem`,
  fontSize: `${variables.px1 * 12}rem`,
}
class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const stateCountdown = this.state.countdown;
    const {drawCountdown} = nextProps.data;
    if (stateCountdown === false && drawCountdown ) {
      this.setState({
        countdown: drawCountdown 
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
    const {data, path, drawTableAction} = this.props;
    const {
      friendRegisterCount,
      register,
      registerList,
      draw,
      drawId,
      drawTable,
      drawCountdown,
      id
    } = data;
    const {countdown} = this.state;
    let countdownFormat;
    if (countdown) {
      countdownFormat = this.formatCountdown(countdown);
    }
    return (
      <div>
        {/*未报名 如果有朋友已报名，显示已报名的朋友数*/}
        {register
        ? <MessageItem className="clearfix">
            {friendRegisterCount > 0
            ? <div className={cs.rigisterLeft}>
                {`你的 ${friendRegisterCount} 位朋友已经报名了比赛`}
              </div>
            : undefined}
            <div className={cs.rigisterRight}>
              <Link to={`${path}/register`}>
                <RaisedButton label="立即报名" style={buttonStyle} />
              </Link>
            </div>
          </MessageItem>
        : undefined}
        
        {/* 已报名显示已经报名的比赛 */}
        {Array.isArray(registerList) && registerList.length > 0
        ? registerList.map((item, index) => {
            return (
                <MessageItem key={index} className="clearfix">
                  <div className="pull-left">您已报名</div>
                  <div className="pull-right">{item}</div>
                </MessageItem>
            );
          })
        : undefined}
        
        {/* 未抽签 */}
        {draw && !register
        ? <MessageItem className="clearfix">
            {friendRegisterCount > 0
            ? <div className={cs.rigisterLeft}>
                {drawCountdown
                ? <span>
                    抽签倒计时 &nbsp;
                    {countdownFormat.day}<span>天</span>
                    {countdownFormat.hour}<span>小时</span>
                    {countdownFormat.minute}<span>分</span>
                    {countdownFormat.second}<span>秒</span>
                  </span>
                : ""}
              </div>
            : undefined}
            <div className={cs.rigisterRight}>
              <RaisedButton onClick={drawTableAction.bind(this, id)} label="签表抽签" style={buttonStyle} />       
            </div>
          </MessageItem>
        : undefined}

        {/* 已经抽签，并得到签位码 */}
        {!draw && drawId
        ? <MessageItem className="clearfix">
            <div className="pull-left">{`你的签位号码 ${drawId}`}</div>
            {drawTable
            ? <div className="pull-right">
                <RaisedButton label="查看签表" style={buttonStyle} />       
              </div>
            : undefined}
          </MessageItem>
        : undefined}
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
const MessageItem = ({style = {}, children, className, props}) => {
  return (
    <div className={`${cs.messagePosition} ${className ? className : ""}`} {...props}>
      <div
        style={style}
        className={cs.messageItem}
      >
        {children}
      </div>
    </div>
  );
}

export default Message;
