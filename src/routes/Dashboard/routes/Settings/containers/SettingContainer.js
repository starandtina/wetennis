import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'
import { reduxForm, getFormValues, Field, initialize } from 'redux-form'
import NavBack from 'components/NavBack'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'
import { Grid, Row, Col } from 'react-bootstrap'
import Divider from 'material-ui/Divider'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { SelectField, TextField, DatePicker } from 'redux-form-material-ui'
import { renderSettingFormTextField } from 'utils/form'
import { fetchMySettings, updateSettings, updateMySettings } from 'routes/Dashboard/modules/settings'

import classes from './SettingContainer.scss'

const formatDate = date => {
  var year = date.getFullYear()
  var month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1

  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  return (year + '-' + month + '-' + day);
}

const mapStateToProps = state => {
  const settings = state.settings
  const formValues = getFormValues('SettingsForm')(state) || {}

  return {
    user: state.user,
    settings,
    formValues: formValues,
    initialValues: {
      ...settings,
      birthday: (state.settings && !Number.isNaN(Date.parse(state.settings.birthday)) ? new Date(state.settings.birthday) : new Date)
    },
  }
}

const mapDispatchToProps = {
  fetchMySettings,
  updateSettings,
  updateMySettings,
  initialize,
  push,
}

class SettingsForm extends PureComponent {
  constructor(props) {
    super(props)
  }

  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  componentDidMount() {
    const {
      fetchMySettings,
      initialize,
      user: {
        user: {
          id
        }
      }
    } = this.props;

    fetchMySettings({
      userId: id,
    }).then(action => {
      const settings = action.payload.data;

      initialize({
        ...settings,
        birthday: (settings && !Number.isNaN(Date.parse(settings.birthday)) ? new Date(settings.birthday) : new Date)
      })
    });
  }

  updateMySettings = () => {
    const {
      updateMySettings,
      user: { user },
      formValues,
    } = this.props

    updateMySettings({
      ...user,
      ...formValues,
      birthday: formatDate(formValues.birthday),
      userId: user.id,
    }).then(({
      payload: {
        code
      }
    }) => {
      if (Number(code) === 0) {
        this.handleOpen()
      }
    })
  }

  render() {
    const {
      submitting,
      user,
      settings,
      children,
      formValues,
    } = this.props

    if (children) {
      return children
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

    const FinalRank = formValues.SelfTechRank ?
      (Number(formValues.SelfTechRank) + Number(formValues.OtherTechRank)) / 2 : formValues.OtherTechRank;

    return (
      <div className='u-has-nav'>
          <NavBack routes={this.props.routes} caption='个人中心' transparent>
          </NavBack>

          <form className='setting-form form-horizontal'>
            <Grid className={classes.Grid}>
              <section>
                <div className={classes.Head}>基本信息</div>
                <Row>
                  <Col xs={4}><label className={classes.label}>用户名</label></Col>
                  <Col xs={8}><div className={classes.Text}>{user.user.username}</div></Col>
                  <Divider />
                </Row>                
                <Field name='email' label='邮箱' labelClassName={classes.label} component={renderSettingFormTextField} />
                <Row>
                  <Col xs={4}><label className={classes.label}>性别</label></Col>
                  <Col xs={8}>
                    <Field
                      component={SelectField}
                      fullWidth
                      autoWidth
                      underlineStyle={underlineStyle}
                      name="gender"
                    >
                      <MenuItem value='male' primaryText="男" />
                      <MenuItem value='female' primaryText="女" />
                    </Field>
                  </Col>
                  <Divider />
                </Row>
                <Row>
                  <Col xs={4}><label className={classes.label}>生日</label></Col>
                  <Col xs={8}>
                    <Field
                      component={DatePicker}
                      hintText="Day of delivery?"
                      underlineStyle={underlineStyle}
                      fullWidth
                      autoOk
                      name="birthday"
                    />
                  </Col>
                  <Divider />
                </Row>
                <Row>
                  <Col xs={4}><label className={classes.label}>信用等级</label></Col>
                  <Col xs={8}>
                    <div className={classes.Text}>{settings.Rank}</div>
                  </Col>
                  <Divider />
                </Row>
              </section>
              <section>
                <div className={classes.Head}>隐私信息</div>
                <Field name='name' label='真实姓名' labelClassName={classes.label} component={renderSettingFormTextField} />
                <Field name='phone' label='电话' labelClassName={classes.label} component={renderSettingFormTextField} />
                <Field name='cardId' label='身份证号' labelClassName={classes.label} component={renderSettingFormTextField} />
                <Field name='companyName' label='工作单位' labelClassName={classes.label} component={renderSettingFormTextField} />
                <Field name='companyTitle' label='职务' labelClassName={classes.label} component={renderSettingFormTextField} />
                <Field name='club' label='所属俱乐部' labelClassName={classes.label} component={renderSettingFormTextField} />
              </section>
              <div className={classes.Head}>技术设置</div>
              <Row>
                <Col xs={4}><label className={classes.label}>网球等级</label></Col>
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
              <Field name='startYear' label='网球元年' labelClassName={classes.label} component={renderSettingFormTextField} />
              <Row>
                <Col xs={4}><label className={classes.label}>持拍</label></Col>
                <Col xs={8}>
                  <Field
                    component={SelectField}
                    fullWidth
                    underlineStyle={underlineStyle}
                    name="hand"
                  >
                    <MenuItem value={0} primaryText="右手" />
                    <MenuItem value={1} primaryText="左手" />
                  </Field>
                </Col>
                <Divider />
              </Row>
              <Row>
                <Col xs={4}><label className={classes.label}>持拍方式</label></Col>
                <Col xs={8}>
                  <Field
                    component={SelectField}
                    fullWidth
                    underlineStyle={underlineStyle}
                    name="habit"
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
                <Col xs={4}><label className={classes.label}>身高(CM)</label></Col>
                <Col xs={8}>
                  <Field
                    component={TextField}
                    type="number"
                    name="height"
                    fullWidth
                    underlineShow={false}
                  />
                </Col>
                <Divider />
              </Row>
              <Row>
                <Col xs={4}><label className={classes.label}>体重(KG)</label></Col>
                <Col xs={8}>
                  <Field
                    component={TextField}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'SettingsForm',
})(SettingsForm))
