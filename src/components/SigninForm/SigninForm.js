import React from 'react'
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
        />
        <TextField
          style={style}
          hintText="密码"
          floatingLabelText="密码"
        />
        <button type="button" className="btn btn-default btn-lg btn-block">登录</button>
        <button type="button" className="btn btn-default btn-lg btn-block u-backgroundTransparent">注册</button>
      </form>
    )
  }
}

export default SigninForm

