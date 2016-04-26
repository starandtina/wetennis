import React from 'react'
import { Link } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import classes from './SigninForm.scss'

export class SigninForm extends React.Component {
  componentWillReceiveProps(nextProps) {
    // If `authenticated` then redirect to
    if(nextProps.user.status === 'authenticated' && nextProps.user.user) {
      const locationState = this.props.location.state

      this.props.actions.push(locationState && locationState.nextPathname || '/');
    }
  }

  render () {
    const {
      fields: { username, password },
      handleSubmit,
      resetForm,
      submitting
      } = this.props

    const style = {
      width: '100%'
    }
    return (
      <form className={classes['form']} onSubmit={handleSubmit(this.props.actions.signInUser.bind(this))}>
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
        <Link to='' className='pull-right'>忘记密码？</Link>
        <div className={`clearfix ${classes['button-groups']}`}>
          {this.props.user.error ? <p className='u-errorText'>{this.props.user.error.message}</p> : ''}
          <button type="submit" className="btn btn-default btn-lg btn-block" disabled={submitting}>登录</button>
          <button type="button" onClick={this.handleSignupButtonClick.bind(this)} className="btn btn-default btn-lg btn-block u-backgroundColorTransparent">注册</button>
        </div>
      </form>
    )
  }

  handleSignupButtonClick(e) {
    e.preventDefault()

    this.props.actions.push('/dashboard/signup/verifyPhone')
  }
}

export default SigninForm

