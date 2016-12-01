import React from 'react'
import { Link } from 'react-router'
import { Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

import { setCookie, logout } from 'utils/auth'
import cs from './SigninForm.scss'

export class SigninForm extends React.Component {
  componentWillReceiveProps(nextProps) {
    // If `authenticated` then redirect to
    if(nextProps.user.status === 'authenticated' && nextProps.user.user) {
      setCookie(nextProps.user.user.id);
      const locationState = this.props.location.state;
      this.props.push(locationState && locationState.nextPathname || '/');
    }
  }

  render () {
    const {
      handleSubmit,
      submitting,
      signInUser
      } = this.props;

    const style = {
      width: '100%'
    };

    return (
      <form onSubmit={handleSubmit(signInUser)}>
        <Field
          name="username"
          component={TextField}
          style={style}
          hintText="用户名"
          floatingLabelText="用户名"
        />
        <Field
          name="password"
          component={TextField}
          style={style}
          hintText="密码"
          floatingLabelText="密码"
          type='password'
        />
        <Link to='/dashboard/resetPassword' className={`pull-right ${cs['forget-password-link']} `}>
          忘记密码？
        </Link>
        <div className={`clearfix button-groups`}>
          <button
            type="submit"
            className='btn btn-default btn-submit btn-lg btn-block'
            disabled={submitting}
          >
            登录
          </button>
          <button
            type="button"
            onClick={this.handleSigninButtonClick.bind(this)}
            className='btn btn-default btn-transparent btn-lg btn-block'>
            注册
          </button>
        </div>
      </form>
    )
  }

  handleSigninButtonClick(e) {
    e.preventDefault()
    this.props.push('/dashboard/signup')
  }
}

export default SigninForm

