import React from 'react'
import { Link } from 'react-router'
import { brower } from 'react-router-redux';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { setCookie, logout } from 'utils/auth'
import cs from './SigninForm.scss'

export class SigninForm extends React.Component {
  componentWillReceiveProps(nextProps) {
    // If `authenticated` then redirect to
    if(nextProps.user.status === 'authenticated' && nextProps.user.user) {
      setCookie(nextProps.user.user.id);
      const locationState = this.props.location.state;

      this.props.actions.push(locationState && locationState.nextPathname || '/');
    }
  }

  signIn = () => {
    const { values } = this.props;
    this.props.actions.signInUser(values);
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
      <form onSubmit={handleSubmit(this.signIn)}>
        <TextField
          style={style}
          hintText="用户名"
          errorText={username.touched ? username.error : ''}
          floatingLabelText="用户名"
          {...username}
        />
        <TextField
          type='password'
          style={style}
          hintText="密码"
          errorText={password.touched ? password.error : ''}
          floatingLabelText="密码"
          {...password}
        />
        <Link to='/dashboard/resetPassword' className={`pull-right ${cs['forget-password-link']} `}>忘记密码？</Link>
        <div className={`clearfix ${cs['button-groups']}`}>
          {this.props.user.error ? <p className='u-errorText'>{this.props.user.error.message}</p> : ''}
          <button type="submit" className='btn btn-default btn-submit btn-lg btn-block' disabled={submitting}>登录</button>
          <button type="button" onClick={this.handleSigninButtonClick.bind(this)} className='btn btn-default btn-transparent btn-lg btn-block'>注册</button>
        </div>
      </form>
    )
  }

  handleSigninButtonClick(e) {
    e.preventDefault()

    this.props.actions.push('/dashboard/signup')
  }
}

export default SigninForm

