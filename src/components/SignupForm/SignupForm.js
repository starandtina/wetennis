import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

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

      // this.props.push(locationState && locationState.nextPathname || '/');
      document.querySelector('body').classList.remove('u-backgroundColorGreen')
      this.props.push('/');
    }
  }

  render () {
    const {
      fields: { username, password, confirmPassword },
      handleSubmit,
      resetForm,
      submitting
      } = this.props

    const style = {
      width: '100%'
    }
    return (
      <form className='registration-form' onSubmit={handleSubmit(this.props.signUpUserThenSetCookie.bind(this))}>
        <TextField
          style={style}
          hintText="用户名"
          errorText={username.touched ? username.error : ''}
          floatingLabelText="用户名"
          {...username}
        />
        <TextField
          style={style}
          hintText="密码"
          errorText={password.touched ? password.error : ''}
          floatingLabelText="密码"
          {...password}
        />
        <TextField
          style={style}
          hintText="确认密码"
          errorText={confirmPassword.touched ? confirmPassword.error : ''}
          floatingLabelText="确认密码"
          {...confirmPassword}
        />
        <div className='button-groups clearfix'>
          {this.props.user.error ? <p className='u-errorText'>{this.props.user.error.message}</p> : ''}
          <button type="submit" className="btn btn-default btn-lg btn-block" disabled={submitting}>注册</button>
        </div>
      </form>
    )
  }
}

export default SignupForm
