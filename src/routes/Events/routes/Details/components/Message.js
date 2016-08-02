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

const Message = ({data, path}) => {
  const {
    friendRegisterCount,
    register,
    registerList,
    draw,
    drawId,
    drawTable,
    drawCountdown
  } = data;
  return (
    <div>
      {/*未报名 如果有朋友已报名，显示已报名的朋友数*/}
      {!register
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
      {register && Array.isArray(registerList) && registerList.length > 0
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
      {!draw
      ? <MessageItem className="clearfix">
          {friendRegisterCount > 0
          ? <div className={cs.rigisterLeft}>
              {drawCountdown ? `抽签倒计时 ${drawCountdown}` : ""}
            </div>
          : undefined}
          <div className={cs.rigisterRight}>
            <RaisedButton label="签表抽签" style={buttonStyle} />       
          </div>
        </MessageItem>
      : undefined}

      {/* 已经抽签，并得到签位码 */}
      {draw && drawId
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
