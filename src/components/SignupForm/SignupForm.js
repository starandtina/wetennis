import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { Grid, Row, Col } from 'react-bootstrap'
import classes from './SignupForm.scss'

export class SignupForm extends React.Component {
  state = {
    buttonSuspending: false,
    Tip: '发送',
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
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

  startTiming = () => {
    let time = this.state.Tip - 1;
    
    this.setState({
      Tip: time,
    })

    if(time < 1){
      this.clearSendActivationStatus()
    }
  }

  clearSendActivationStatus() {
    window.clearInterval(this.thisEvent);
    this.setState({
      buttonSuspending: false,
      Tip: '发送',
    })
  }

  sendActivationCode = () => {
    const { sendActivationCode, formValues, theSyncErrors } = this.props;
    
    if (formValues.phone && (!theSyncErrors || !theSyncErrors.phone)) {
      sendActivationCode({
        phone: formValues.phone
      }).then(({
        payload: {
          code
        }
      }) => {
        if (Number(code) === 0) {
          this.setState({
            buttonSuspending: true,
            Tip: 180,
          })
          this.thisEvent = setInterval(this.startTiming.bind(this), 1000)
        }
      })
    }
  }

  handlePhoneChange = e => {
    this.clearSendActivationStatus()
  }

  render () {
    const {
      handleSubmit,
      submitting,
      userNameDuplicated,
      phoneDuplicated,
    } = this.props

    const style = {
      width: '100%'
    };

    const underlineStyle = {
      marginBottom: '-10px'
    };

    const errorStyle = {
      bottom: 0,
      top: 0
    };

    const inputStyle = {
      color: 'white',
      fontSize: '30px',
      lineHeight: '40px'
    };

    return (
      <form className='form' onSubmit={handleSubmit(this.props.signUpUserThenSetCookie.bind(this))}>
        <Grid>
          <Row>
            <Col xs={12}>
              <Field
                name="username"
                component={TextField}
                style={style}
                hintText="用户名"
                floatingLabelText="用户名"
                inputStyle={inputStyle}
                underlineStyle={underlineStyle}
                errorStyle={errorStyle}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Field
                name="password"
                type="password"
                component={TextField}
                style={style}
                hintText="密码"
                floatingLabelText="密码"
                inputStyle={inputStyle}
                underlineStyle={underlineStyle}
                errorStyle={errorStyle}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Field
                name="phone"
                component={TextField}
                style={style}
                hintText="手机号"
                floatingLabelText="手机号"
                inputStyle={inputStyle}
                underlineStyle={underlineStyle}
                errorStyle={errorStyle}
                onChange={this.handlePhoneChange}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <Field
                name="activationCode"
                component={TextField}
                style={style}
                hintText="验证码"
                floatingLabelText="验证码"
                inputStyle={inputStyle}
                underlineStyle={underlineStyle}
                errorStyle={errorStyle}
              />
            </Col>
            <Col xs={4}>
              <button
                style={{marginTop: '28px'}}
                className='btn btn-default btn-block btn-transparent'
                disabled={this.state.buttonSuspending}
                onClick={this.sendActivationCode}
                disabled={phoneDuplicated}
              >
                {this.state.Tip}
              </button>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Field
                name="name"
                component={TextField}
                style={style}
                hintText="真实姓名"
                floatingLabelText="真实姓名"
                inputStyle={inputStyle}
                underlineStyle={underlineStyle}
                errorStyle={errorStyle}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Field
                name="cardId"
                component={TextField}
                style={style}
                hintText="身份证号码"
                floatingLabelText="身份证号码"
                inputStyle={inputStyle}
                underlineStyle={underlineStyle}
                errorStyle={errorStyle}
              />
            </Col>
          </Row>
        </Grid>
        <div className='button-groups clearfix'>
          {this.props.user.error ? <p className='u-errorText'>{this.props.user.error.message}</p> : ''}
          <button
            type="submit"
            className="btn btn-default btn-submit btn-lg btn-block"
            disabled={phoneDuplicated||userNameDuplicated||submitting}
          >
            注册
          </button>
        </div>
      </form>
    )
  }
}

export default SignupForm
