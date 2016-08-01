import React, { Component } from 'react';
import style from './Announcement.scss';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';

class Announcement extends Component {
  state = {
    buttonStatus: false,
  }

  onCheck = (event, isInputChecked) => {
    this.setState({
      buttonStatus: isInputChecked,
    })
  }

  confirm = () => {
    const { push, params } = this.props;
    push(`/events/${params.eventId}/register/Purchase`)
  };

  render() {

      console.log(12321321);
    return (
      <div className={style.Root}>
        <h2 className={style.H2}>参赛责任书</h2>
        <p>1、我完全了解自己的身体状况，确认自己的健康状况良好；没有任何身体不适或疾病（包括先天性心脏病、风湿性心脏病、高血压、脑血管疾病、心肌炎、其他心脏病、冠状动脉病、严重心律不齐、血糖过高或过低的糖尿病、以及其它不适合相关运动的疾病），因此我郑重声明，可以正常参加中央国家机关第三届职工运动会比赛和活动。</p>
          <p>2、我充分了解本次活动期间的训练或比赛有潜在的危险，以及可能由此而导致的受伤或事故，我会竭尽所能，以对自己的安全负责任的态度参赛。</p>
          <p>3、我本人愿意遵守本次比赛活动的所有规则规定；如果本人在参赛过程中发现或注意到任何风险和潜在风险，本人将立刻终止参赛或告之赛会官员。</p>
          <p>4、我本人以及我的继承人、代理人、个人代表或亲属将放弃追究所有导致伤残、损失或死亡的权利。</p>
          <p>5、我同意接受主办方在比赛期间提供的现场急救性质的医务治疗，但在医院救治等发生的相关费用由本人负担。</p>
        <p>本人已认真阅读全面理解以上内容，且对上述所有内容予以确认并承担相应的法律责任，本人签署此责任书纯属自愿。</p>
        <Checkbox
          checked={this.state.buttonStatus}
          label="我同意签署参赛责任书"
          onCheck={this.onCheck}
        />
        <div className={style.ButtonGroup}>
          <button
            primary={true}
            disabled={!this.state.buttonStatus}
            onClick={this.confirm}
            className={`btn btn-primary btn-lg btn-block ${style.Button}`}
            >
            同意
            </button>
        </div>
      </div>
    )
  }
}

export default connect(null, { push: pushAction })(Announcement);
