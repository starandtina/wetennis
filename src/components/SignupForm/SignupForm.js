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

      document.querySelector('body').classList.remove('u-backgroundColorGreen')
      this.props.push('/');
    }
  }

  state = {
    buttonSuspending: false,
    leftTime: 60,
    Tip: '验证',
  };

  render () {
    const {
      fields: { username, password, phone, activationCode },
      handleSubmit,
      submitting
      } = this.props

    const style = {
      width: '100%'
    };

    const sendactivationCode = () => {
      const { verifyPhone, fields: { phone } } = this.props;
      verifyPhone({phone: phone.value});
      this.setState({
        buttonSuspending: true,
        Tip: 60,
      })
      window.startTiming = () => {
        let time = this.state.Tip - 1;
        this.setState({
          Tip: time,
        })
        if(time < 1){
          clearInterval(window.thisEvent);
          this.setState({
            buttonSuspending: false,
            Tip: '验证',
          })
        }
      }
      window.thisEvent = setInterval("startTiming()", 1000);
    };

    return (
      <form className='registration-form' onSubmit={handleSubmit(this.props.signUpUserThenSetCookie.bind(this))}>
        <Grid>
          <Row>
            <Col xs={8}>
              <TextField
                style={style}
                hintText="手机号"
                errorText={phone.touched ? phone.error : ''}
                floatingLabelText="手机号"
                {...phone}
              />
            </Col>
            <Col xs={4}>
              <RaisedButton
                style={{'marginTop': '28px'}}
                label={this.state.Tip}
                disabled={this.state.buttonSuspending}
                onClick={sendactivationCode}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TextField
                style={style}
                hintText="用户名"
                errorText={username.touched ? username.error : ''}
                floatingLabelText="用户名"
                {...username}
              />
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
          <Row>
            <Col xs={12}>
              <TextField
                style={style}
                hintText="密码"
                errorText={password.touched ? password.error : ''}
                floatingLabelText="密码"
                {...password}
              />
            </Col>
          </Row>
        </Grid>
        <div className='button-groups clearfix'>
          {this.props.user.error ? <p className='u-errorText'>{this.props.user.error.message}</p> : ''}
          <button type="submit" className="btn btn-default btn-lg btn-block" disabled={submitting}>注册</button>
        </div>
      </form>
    )
  }
}

export default SignupForm
