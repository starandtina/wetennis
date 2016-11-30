import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux'
import { reduxForm, getFormValues, Field, initialize } from 'redux-form'
import NavBack from 'components/NavBack'
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { Grid, Row, Col } from 'react-bootstrap';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {
  SelectField,
  TextField,
  DatePicker,
} from 'redux-form-material-ui'

import { fetchMySettings, updateSettings, updateMySettings } from 'routes/Dashboard/modules/settings'

import classes from './SettingContainer.scss';

const formatDate = date => {
  var year = date.getFullYear();
  var month = date.getMonth() < 9 ? '0'+ (date.getMonth()+1) : date.getMonth()+1

  var day =  date.getDate() < 10 ? '0'+ date.getDate(): date.getDate()
  return (year+'-'+month+'-'+day);
}

const validate = values => {
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

const mapStateToProps = (state) => {
  const settings = state.settings;
  return ({
  user: state.user,
  settings,
  formValues: getFormValues('SettingsForm')(state),
  initialValues: {
    ...settings,
    birthday: (state.settings && state.settings.birthday ? new Date(state.settings.birthday) : new Date)
  }
})};

const mapDispatchToProps = {
    fetchMySettings,
    updateSettings,
    updateMySettings,
    initialize,
    push
};

class SettingsForm extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  componentDidMount () {
    const { fetchMySettings, initialize , user: { user: { id } } } = this.props;
    fetchMySettings({
      userId: id
    }).then(action => {
      const settings = action.payload.data;
      initialize({
        ...settings,
        birthday: new Date(settings.birthday)
      })
    });
  }

  updateMySettings = () => {
    const {
      updateMySettings,
      user: { user },
      formValues
    } = this.props;

    updateMySettings({
      ...formValues,
      birthday: formatDate(formValues.birthday),
      userId: user.id
    }).then(({payload: { code }}) => {
      if (Number(code) === 0) {
        this.handleOpen()
      }
    })
  };

  render () {
    const {
      submitting,
      user,
      settings,
      children,
      } = this.props;
    if(children){
      return children;
    }
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    const style = {
      width: '100%'
    };

    const underlineStyle = {
      display: 'none'
    }
    const FinalRank = settings.SelfTechRank ?
    (Number(settings.SelfTechRank) + Number(settings.OtherTechRank)) / 2 : settings.OtherTechRank;

    return (
        <div className='u-hasNav'>
          <NavBack routes={this.props.routes} caption='个人中心' transparent>
          </NavBack>

          <form className='setting-form'>
            <Grid className={classes.Grid}>
              <div className={classes.Head}>基本信息</div>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>用户名</label>
                </Col>
                <Col xs={8}>
                  <div className={classes.Text}>{user.user.username}</div>
                </Col>
                <Divider />
              </Row>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>邮箱</label>
                </Col>
                <Col xs={8}>
                  <Field
                    component={TextField}
                    inputStyle={{
                        textAlign: 'left',
                        color: '#929292',
                      }}
                    name="email"
                    fullWidth
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
                  <Field
                    component={SelectField}
                    fullWidth
                    autoWidth
                    underlineStyle={underlineStyle}
                    name="gender"
                    style={{
                        color: '#929292',
                      }}
                  >
                    <MenuItem value='male' primaryText="男" />
                    <MenuItem value='female' primaryText="女" />
                  </Field>
                </Col>
                <Divider />
              </Row>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>生日</label>
                </Col>
                <Col xs={8}>
                  <Field
                    component={DatePicker}
                    underlineStyle={underlineStyle}
                    fullWidth
                    autoOk
                    name="birthday"
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
                  <Field
                    component={TextField}
                    inputStyle={{
                        textAlign: 'left',
                        color: '#929292',
                      }}
                    name="startYear"
                    fullWidth
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
                  <Field
                    component={SelectField}
                    fullWidth
                    underlineStyle={underlineStyle}
                    name="hand"
                    style={{
                        color: '#929292',
                      }}
                  >
                    <MenuItem value={0} primaryText="右手" />
                    <MenuItem value={1} primaryText="左手" />
                  </Field>
                </Col>
                <Divider />
              </Row>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>持拍方式</label>
                </Col>
                <Col xs={8}>
                  <Field
                    component={SelectField}
                    fullWidth
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
                  </Field>
                </Col>
                <Divider />
              </Row>
              <Row>
                <Col xs={4}>
                  <label className={classes.label}>身高(CM)</label>
                </Col>
                <Col xs={8}>
                  <Field
                    component={TextField}
                    inputStyle={{
                        textAlign: 'left',
                        color: '#929292',
                      }}
                    type="number"
                    name="height"
                    fullWidth
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
                  <Field
                    component={TextField}
                    inputStyle={{
                        textAlign: 'left',
                        color: '#929292',
                      }}
                    type="number"
                    name="weight"
                    fullWidth
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
                <Divider className="wert"/>
              </Row>
              <Row>
                <Col xs={12}>
                </Col>
                <Divider className="wert"/>
              </Row>
            </Grid>
            <div className='button-groups clearfix container'>
              {this.props.user.error ? <p className='u-errorText'>{this.props.user.error.message}</p> : ''}
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                disabled={submitting}
                onClick={this.updateMySettings}
              >
                确认修改
              </button>
            </div>
          </form>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            保存成功
          </Dialog>
        </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'SettingsForm',
  validate
})(SettingsForm))
