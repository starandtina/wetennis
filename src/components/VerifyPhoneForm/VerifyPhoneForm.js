import React from 'react'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import classes from './VerifyPhoneForm.scss'
import { Grid, Row, Col } from 'react-bootstrap'

export class VerifyPhoneForm extends React.Component {
  componentWillReceiveProps(nextProps) {

  }

  render () {
    const {
      fields: { phone, code },
      handleSubmit,
      resetForm,
      submitting
      } = this.props

    const style = {
      width: '100%'
    }
    return (
      <form className={classes['form']} onSubmit={handleSubmit(this.props.actions.verifyPhone.bind(this))}>
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
                style={{'margin-top': '28px'}}
                label='验证'
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TextField
                style={style}
                hintText="验证码"
                errorText={code.touched ? code.error : ''}
                floatingLabelText="验证码"
                {...code}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className={`clearfix ${classes['button-groups']}`}>
                {this.props.user.error ? <p className='u-errorText'>{this.props.user.error.message}</p> : ''}
                <RaisedButton
                  label='确认'
                  type='submit'
                  style={style}
                  disabled={submitting}>
                </RaisedButton>
              </div>
           </Col>
          </Row>
        </Grid>
      </form>
    )
  }

  handleSignupButtonClick(e) {
    e.preventDefault()

    this.props.actions.push('/dashboard/signup/verifyPhone')
  }
}

export default VerifyPhoneForm

