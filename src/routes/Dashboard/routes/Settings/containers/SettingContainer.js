import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router';
import { push } from 'react-router-redux'
import { reduxForm } from 'redux-form'
import prop from 'lodash/fp/prop';
import NavBack from 'components/NavBack'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { Grid, Row, Col } from 'react-bootstrap';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';

import { fetchMySettings, updateSettings } from 'routes/Dashboard/modules/settings'

import classes from './SettingContainer.scss';

const fields = ['email', 'gender', 'birthday', 'startYear', 'hand', 'habit', 'height', 'weight'];

const validate = (values) => {
  var errors = {};
  var hasErrors = false;
  //if(!values.password || values.password.trim() === '') {
  //  errors.password = 'Enter password';
  //  hasErrors = true;
  //}
  //if(!values.phone || values.phone.trim() === '') {
  //  errors.phone = 'Enter phone';
  //  hasErrors = true;
  //}
  //if (values.phone && !/\b\d{3}[-.]?\d{4}[-.]?\d{4}\b/i.test(values.phone)) {
  //  errors.phone = '请输入正确的手机号'
  //  hasErrors = true
  //}
  //if(!values.activationCode || values.activationCode.trim() === '') {
  //  errors.activationCode = 'Enter Code';
  //  hasErrors = true;
  //}
  return hasErrors && errors;
}

const mapStateToProps = (state) => ({
  user: state.user,
  settings: state.settings
});

//const mapDispatchToProps = (dispatch) => ({
//  ...bindActionCreators({
//    fetchMySettings,
//    updateSettings,
//    push,
//  }, dispatch)
//})
const mapDispatchToProps = {
    fetchMySettings,
    updateSettings,
    push
};

class SettingsForm extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    buttonSuspending: false,
    leftTime: 180,
    Tip: '验证',
  };

  componentDidMount () {
    const { fetchMySettings , user} = this.props;
    fetchMySettings({
      userId: prop('user.id')(user),
    });
  }

  handleChange = field => ({ target: { value } }) => {
    const { updateSettings } = this.props;
    updateSettings({
      [field]: value,
    });
  };

  handleChangeDate = (empty, date) => {
    const { updateSettings } = this.props;
    updateSettings({
      birthday: date.toISOString().substring(0, 10),
    });
  };

  handleChangeGender = (event, key, payload) => {
    const { updateSettings } = this.props;
    updateSettings({
      gender: payload,
    });
  }

  handleChangeHand = (event, key, payload) => {
    const { updateSettings } = this.props;
    updateSettings({
      hand: payload,
    });
  }

  handleChangeHabit = (event, key, payload) => {
    const { updateSettings } = this.props;
    updateSettings({
      habit: payload,
    });
  }

  render () {
    const {
      fields: { email, gender, birthday, startYear, hand, habit, height, weight },
      handleSubmit,
      submitting,
      user,
      settings,
      children,
      } = this.props;

    if(children){
      return children;
    }
    const style = {
      width: '100%'
    };
    console.log(settings, user);
    const underlineStyle = {
      display: 'none'
    }
    const FinalRank = settings.SelfTechRank ?
    (Number(settings.SelfTechRank) + Number(settings.OtherTechRank)) / 2 : settings.OtherTechRank;

    const myBirth = settings.birthday ? new Date(settings.birthday) : new Date();
    console.log(settings.birthday, myBirth);
    return (
        <div>
          <NavBack caption='个人中心'>
          </NavBack>

          <form className='setting-form'>
            <Grid>
              <div className={classes.Head}>基本信息</div>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>用户名</label>
                </Col>
                <Col xs={8}>
                  <div className={classes.Text}>{prop('user.username')(user)}</div>
                </Col>
                <Divider />
              </Row>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>邮箱</label>
                </Col>
                <Col xs={8}>
                  <TextField
                    inputStyle={{
                        textAlign: 'left',
                        color: '#929292',
                      }}
                    name="email"
                    fullWidth
                    onChange={this.handleChange('email')}
                    value={settings.email}
                    underlineShow={false}
                  />
                </Col>
                <Divider />
              </Row>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>性别</label>
                </Col>
                <Col xs={8}>
                  <SelectField
                    value={settings.gender}
                    onChange={this.handleChangeGender}
                    underlineStyle={underlineStyle}
                    name="gender"
                    style={{
                        color: '#929292',
                      }}
                  >
                    <MenuItem value='male' primaryText="男" />
                    <MenuItem value='female' primaryText="女" />
                  </SelectField>
                </Col>
                <Divider />
              </Row>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>生日</label>
                </Col>
                <Col xs={8}>
                  <DatePicker
                    onChange={this.handleChangeDate}
                    autoOk
                    value={myBirth}
                    name="birth"
                  />
                </Col>
                <Divider />
              </Row>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>信用等级</label>
                </Col>
                <Col xs={8}>
                  <div className={classes.Text}>{settings.Rank}</div>
                </Col>
                <Divider />
              </Row>
              <div className={classes.Head}>技术设置</div>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>网球等级</label>
                </Col>
                <Col xs={8}>
                  <div className={`${classes.Text} ${classes.TechRank}`}>
                    <Link to="/dashboard/settings/techRank">
                      {FinalRank}
                      <i className="material-icons">chevron_right</i>
                    </Link>
                  </div>
                </Col>
                <Divider />
              </Row>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>网球元年</label>
                </Col>
                <Col xs={8}>
                  <TextField
                    inputStyle={{
                        textAlign: 'left',
                        color: '#929292',
                      }}
                    name="startYear"
                    fullWidth
                    onChange={this.handleChange('startYear')}
                    value={settings.startYear || new Date().getFullYear()}
                    underlineShow={false}
                  />
                </Col>
                <Divider />
              </Row>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>持拍</label>
                </Col>
                <Col xs={8}>
                  <SelectField
                    value={settings.hand}
                    onChange={this.handleChangeHand}
                    underlineStyle={underlineStyle}
                    name="hand"
                    style={{
                        color: '#929292',
                      }}
                  >
                    <MenuItem value={0} primaryText="右手" />
                    <MenuItem value={1} primaryText="左手" />
                  </SelectField>
                </Col>
                <Divider />
              </Row>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>持拍方式</label>
                </Col>
                <Col xs={8}>
                  <SelectField
                    value={settings.habit}
                    onChange={this.handleChangeHabit}
                    underlineStyle={underlineStyle}
                    name="habit"
                    style={{
                        color: '#929292',
                      }}
                  >
                    <MenuItem value={0} primaryText="单手正拍" />
                    <MenuItem value={1} primaryText="双手正拍" />
                    <MenuItem value={2} primaryText="单手反拍" />
                    <MenuItem value={3} primaryText="双手反拍" />
                  </SelectField>
                </Col>
                <Divider />
              </Row>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>身高(CM)</label>
                </Col>
                <Col xs={8}>
                  <TextField
                    inputStyle={{
                        textAlign: 'left',
                        color: '#929292',
                      }}
                    type="number"
                    name="height"
                    fullWidth
                    onChange={this.handleChange('height')}
                    value={settings.height}
                    underlineShow={false}
                  />
                </Col>
                <Divider />
              </Row>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>体重(KG)</label>
                </Col>
                <Col xs={8}>
                  <TextField
                    inputStyle={{
                        textAlign: 'left',
                        color: '#929292',
                      }}
                    type="number"
                    name="weight"
                    fullWidth
                    onChange={this.handleChange('weight')}
                    value={settings.weight}
                    underlineShow={false}
                  />
                </Col>
                <Divider />
              </Row>
              <Row>
                <Col xs={12}>
                  <div className={classes.Link}><Link to="/dashboard/settings/security">隐私<i className="material-icons">chevron_right</i></Link></div>
                </Col>
                <Divider />
              </Row>
              <Row>
                <Col xs={12}>
                  <div className={classes.Link}><Link to="/dashboard/settings/address">地址<i className="material-icons">chevron_right</i></Link></div>
                </Col>
                <Divider />
              </Row>

            </Grid>
            <div className='button-groups clearfix'>
              {this.props.user.error ? <p className='u-errorText'>{this.props.user.error.message}</p> : ''}
              <button type="submit" className="primary btn btn-default btn-lg btn-block" disabled={submitting}>确认修改</button>
            </div>
          </form>
        </div>
    )
  }
}
export default reduxForm({
  form: 'SettingsForm',
  fields,
  validate
}, mapStateToProps, mapDispatchToProps)(SettingsForm)
