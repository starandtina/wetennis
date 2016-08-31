import React, {Component} from "react";
import NavBack from "components/NavBack";
import RaisedButton from 'material-ui/RaisedButton';
import {
  MatchInfoStatus, EventInfo
} from "routes/Events/routes/Match/components/eventMatchInfo";
import cs from "./Betting.scss";

export default class Betting extends Component {
  state = {
    integral: "",
    integralError: false
  }
  componentDidMount() {
    const {getInfo, params: {eventId}} = this.props;
    getInfo(eventId)
  }
  setIntegral = (e) => {
    const {integral} = this.props.info;
    const v = e.target.value;
    const n = Number(v);
    if (isNaN(n) || n > integral) {
      this.setState({
        integral: v,
        integralError: `请输入大于0且小于${integral}的数字!`
      });
    } else {
      this.setState({
        integral: v,
        integralError: false
      });
    }
  }
  submit = () => {
    const {submit, params: {eventId}} = this.props;
    const {integral} = this.state;
    if (integral > 0) {
      submit(eventId, integral);
    }
  }
  render() {
    const {info} = this.props;
    const {integralError, integral} = this.state;
    return (
      <div className={cs.box}>
        <NavBack title='竞猜投注' />
        <MatchInfoStatus data={info.status} />
        <EventInfo data={info} />
        <div className={cs.boxTitle}>竞猜项目</div>
        <div className={cs.item}>
          <div className={cs.label}>比赛</div>
          <div className={cs.value}>{info.match}</div>
        </div>
        <div className={cs.item}>
          <div className={cs.label}>比分</div>
          <div className={cs.value}>{info.score}</div>
        </div>
        <div className={cs.item}>
          <div className={cs.label}>投注积分</div>
          <div className={cs.value}>
            <input
              value={this.state.integral}
              onChange={this.setIntegral}
              className={cs.inputBox}
              type="text"
              placeholder={`请输入投注积分 (可用${info.integral})`}
            />
          </div>
        </div>
        {integralError
        ? (<div className={`${cs.item} ${cs.itemError}`}>{integralError}</div>)
        : undefined}
        <div className={cs.item}>
          <div className={cs.label}>预计收益</div>
          <div className={cs.value}>
            <span className={`${info.risk ? cs.high : cs.low}`}>{info.profit}</span>
            <span>{(info.profit * integral).toFixed(2)}</span>
          </div>
        </div>
        <div className={cs.submitButton}>
          <RaisedButton
            onClick={this.submit}
            label="确认支付"
            style={{width: "100%"}}
            fullWidth={true}
          />        
        </div>
      </div>
    );
  }
}
