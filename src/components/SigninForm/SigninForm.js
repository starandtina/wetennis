import React from 'react'
import { Link } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import classes from './SigninForm.scss'

export class SigninForm extends React.Component {
  props: Props;

  render () {
    const {
      fields: { username, password },
      handleSubmit,
      resetForm,
      submitting
      } = this.props

    const style = {
      width: '295px'
    }
    return (
      <form className={classes['form']} onSubmit={handleSubmit(this.props.actions.signInUser.bind(this))}>
        <TextField
          style={style}
          hintText="用户名"
          floatingLabelText="用户名"
          {...username}
        />
        <TextField
          style={style}
          hintText="密码"
          floatingLabelText="密码"
          {...password}
        />
        <Link to='' className='pull-right'>忘记密码？</Link>
        <div className={`clearfix ${classes['button-groups']}`}>
          <button type="submit" className="btn btn-default btn-lg btn-block" disabled={submitting}>登录</button>
          <button type="button" className="btn btn-default btn-lg btn-block u-backgroundColorTransparent">注册</button>
        </div>
      </form>
    )
  }
}

export default SigninForm

