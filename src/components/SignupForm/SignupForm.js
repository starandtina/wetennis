import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-bootstrap'
import classes from './SignupForm.scss'

export class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    document.querySelector('body').classList.add('u-backgroundColorGreen')
  }

  componentWillReceiveProps(nextProps) {
    // If `authenticated` then redirect to
    if(nextProps.user.status === 'authenticated' && nextProps.user.user) {
      const locationState = this.props.location.state

      this.props.push('/');
    }
  }

  componentWillUnmount() {
    document.querySelector('body').classList.remove('u-backgroundColorGreen')
  }

  state = {
    buttonSuspending: false,
    Tip: '发送',
  };

  checkPhone = () => {
    const { checkPhoneDuplicated, fields: { phone } } = this.props;
    phone && phone.onBlur();
    checkPhoneDuplicated({
      "phone": +phone.value
    })
  }

  checkUserName = () => {
    const { checkUserNameDuplicated, fields: { username } } = this.props;
    username && username.onBlur();
    checkUserNameDuplicated({
      userName: username.value
    })
  }

  startTiming = () => {
    let time = this.state.Tip - 1;
    this.setState({
      Tip: time,
    })
    if(time < 1){
      window.clearInterval(this.thisEvent);
      this.setState({
        buttonSuspending: false,
        Tip: '发送',
      })
    }
  }

  sendactivationCode = () => {
    const { sendActivationCode, fields: { phone } } = this.props;

    if (phone.error) {
      return
    }

    sendActivationCode({
      phone: phone.value
    })

    this.setState({
      buttonSuspending: true,
      Tip: 180,
    })
    this.thisEvent = setInterval(this.startTiming.bind(this), 1000)
  }

  render () {
    const {
      fields: { username, password, phone, activationCode },
      handleSubmit,
      submitting,
      userNameDuplicated,
      phoneDuplicated
      } = this.props;

    const style = {
      width: '100%'
    };

    if(!username.error && userNameDuplicated){
      username.error = '用户名重复';
    }
    if(!phone.error && phoneDuplicated){
      phone.error = '电话号码重复';
    }

    return (
      <form className='form' onSubmit={handleSubmit(this.props.signUpUserThenSetCookie.bind(this))}>
        <Grid>
          <Row>
            <Col xs={12}>
              <TextField
                style={style}
                hintText="用户名"
                errorText={username.touched ? username.error : ''}
                floatingLabelText="用户名"
                {...username}
                onBlur={this.checkUserName}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TextField
                type='password'
                style={style}
                hintText="密码"
                errorText={password.touched ? password.error : ''}
                floatingLabelText="密码"
                {...password}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <TextField
                style={style}
                hintText="手机号"
                errorText={phone.touched ? phone.error : ''}
                floatingLabelText="手机号"
                {...phone}
                onBlur={this.checkPhone}
              />
            </Col>
            <Col xs={4}>
              <button
                style={{marginTop: '28px'}}
                className='btn btn-default btn-block btn-transparent'
                disabled={this.state.buttonSuspending}
                onClick={this.sendactivationCode}>
                {this.state.Tip}
              </button>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TextField
                style={style}
                hintText="验证码"
                errorText={activationCode.touched ? activationCode.error : ''}
                floatingLabelText="验证码"
                {...activationCode}
              />
            </Col>
          </Row>
        </Grid>
        <div className='button-groups clearfix'>
          {this.props.user.error ? <p className='u-errorText'>{this.props.user.error.message}</p> : ''}
          <button type="submit" className="btn btn-default btn-submit btn-lg btn-block" disabled={userNameDuplicated||userNameDuplicated||submitting}>注册</button>
        </div>
      </form>
    )
  }
}

export default SignupForm
