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
      id,
      state,
      isGroup,
      isAllocate,
      team,
      isRegistered,
    } = data;
    const {countdown} = this.state;
    let countdownFormat;
    let hasDoNotDrawItem = false;
    if (registerList && registerList.length !== 0) {
      registerList.forEach(item => {
        if (!hasDoNotDrawItem && !item.id) {
          hasDoNotDrawItem = true
        }
      });
    }
    if (countdown && hasDoNotDrawItem) {
      countdownFormat = this.formatCountdown(countdown);
    }
    return (
      <div>

        {/*未报名 如果有朋友已报名，显示已报名的朋友数*/}
        {state == 1
        ? <MessageItem className="clearfix">
            {friendRegisterCount > 0
            ? <div className={cs.rigisterLeft}>
                {`你的 ${friendRegisterCount} 位朋友已经报名了比赛`}
              </div>
            : undefined}
            {isGroup
            ? !isRegistered && <div className={cs.rigisterRight}>
                <Link to={`${path}/team/register`}>
                  <RaisedButton label="团队报名" style={buttonStyle} />
                </Link>
              </div>
            : !isRegistered && <div className={cs.rigisterRight}>
                <Link to={`${path}/register`}>
                  <RaisedButton label="立即报名" style={buttonStyle} />
                </Link>
              </div>}
          </MessageItem>
        : undefined}
        
        {isGroup && !isAllocate && [5,6].includes(state)
        ? <MessageItem className={`clearfix ${cs['mainColorItem']}`}>
            <div className={cs.rigisterLeft}>分配队员顺序</div>
            <div className={cs.rigisterRight}>
              <Link to={`${path}/${team.id}/schedule`}>
                <RaisedButton label="立刻分配" style={buttonStyle} />
              </Link>
            </div>
          </MessageItem>
        : undefined}

        {/* 已报名显示已经报名的比赛 */}
        {Array.isArray(registerList) && registerList.length > 0 && [3, 4, 5, 6].indexOf(Number(state) !== -1)
        ? registerList.map((item, index) => {
            return (
              <MessageItem key={index}>
                <div className={cs.registerListBox}>
                  <div className={cs.registerListText}>
                    {`您已报名 ${item.name}${item.id ? ` 签位码: #${item.id}` : ""}`}
                  </div>
                  {!item.id
                  ? <RaisedButton onClick={drawTableAction.bind(this, id)} label="签表抽签" style={buttonStyle} />
                  : undefined}
                </div>
              </MessageItem>
            );
          })
        : undefined}

        {/* 显示抽签倒计时 */}
        {hasDoNotDrawItem && countdown && state == 3
        ? <MessageItem>
            抽签倒计时 &nbsp;
            {countdownFormat.day}<span>天</span>
            {countdownFormat.hour}<span>小时</span>
            {countdownFormat.minute}<span>分</span>
            {countdownFormat.second}<span>秒</span>
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
