import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import { reduxForm, Field, submit } from 'redux-form'
import { Grid, Row, Col } from 'react-bootstrap'
import { RadioButton } from 'material-ui/RadioButton'
import {
  RadioButtonGroup,
  TextField,
  DatePicker,
} from 'redux-form-material-ui'

import { addImage, clearTimeImage, addTimeMessage as addTimeMatch } from 'routes/Time/modules'
import NavBack from 'components/NavBack'
import AddImage from 'routes/Time/components/addImage'
import style from './AddMatch.scss'

const formatDate = date => {
  var year = date.getFullYear()
  var month = date.getMonth() < 9 ? '0'+ (date.getMonth()+1) : date.getMonth()+1

  var day =  date.getDate() < 10 ? '0'+ date.getDate(): date.getDate()
  return (year+'-'+month+'-'+day)
}

const validate = (values) => {
  var errors = {}
  var hasErrors = false
  if (!values.message || values.message.trim() === '') {
    errors.message = '请添加心情'
    hasErrors = true
  }
  if (!values.date) {
    errors.date = '请选择时间'
    hasErrors = true
  }
  if (!values.location || values.location.trim() === '') {
    errors.location = '请输入地点'
    hasErrors = true
  }
  if (!values.match || values.match.trim() === '') {
    errors.match = '请选择比赛类型'
    hasErrors = true
  }
  if (!values.us || values.us.trim() === '') {
    errors.us = '请输入本方选手'
    hasErrors = true
  }
  if (!values.ourScore || values.ourScore.trim() === '') {
    errors.ourScore = '请输入比分'
    hasErrors = true
  } else if (Number(values.ourScore) > 7) {
    errors.ourScore = '比分错误'
    hasErrors = true
  }
  if (!values.opponent || values.opponent.trim() === '') {
    errors.opponent = '请输入对手'
    hasErrors = true
  }
  if (!values.opponentScore || values.opponentScore.trim() === '') {
    errors.opponentScore = '请输入比分'
    hasErrors = true
  } else if (Number(values.opponentScore) > 7) {
    errors.opponentScore = '比分错误'
    hasErrors = true
  }

  return hasErrors && errors
}

class AddMatch extends Component {

  constructor(props) {
    super(props)
    document.querySelector('body').classList.add('u-backgroundColorGreen')
  }

  componentWillUnmount() {
    document.querySelector('body').classList.remove('u-backgroundColorGreen')
  }

  componentDidMount(){
    const { clearTimeImage } = this.props
    clearTimeImage()
  }

  handleDoneClick = () => {
    const { submit } = this.props

    submit('AddMatchForm')
  }

  render() {
    const {
      handleSubmit,
      submitting,
      time,
      addImage
      } = this.props

    const fieldStyle = {
      radioButton: {
        marginBottom: 16,
        color: 'white',
      }
    }

    return <div className='u-has-nav'>
      <form className={style.container} onSubmit={handleSubmit}>
        <NavBack routes={this.props.routes} caption='添加我的约球' leftText='close' transparent removeColor className='white-theme'>
          <i onClick={this.handleDoneClick} className='material-icons'>done</i>
        </NavBack>
        <div className={style.Fields}>
          <Grid>
            <Row>
              <Col xs={6}>
                <Field
                  name='date'
                  component={DatePicker}
                  floatingLabelText='选择时间'
                  fullWidth
                  defaultDate={new Date}
                  maxDate={new Date}
                  autoOk
                />
              </Col>
              <Col xs={6}>
                <Field
                  name='location'
                  component={TextField}
                  fullWidth
                  floatingLabelText='选择地点...'
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Field
                  name='match'
                  component={TextField}
                  fullWidth
                  floatingLabelText='比赛'
                />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Field
                  name='us'
                  component={TextField}
                  fullWidth
                  floatingLabelText='选手'
                />
              </Col>
              <Col xs={6}>
                <Field
                  name='ourScore'
                  type='number'
                  component={TextField}
                  fullWidth
                  floatingLabelText='比分'
                />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Field
                  name='opponent'
                  component={TextField}
                  fullWidth
                  floatingLabelText='对手'
                />
              </Col>
              <Col xs={6}>
                <Field
                  name='opponentScore'
                  type='number'
                  component={TextField}
                  fullWidth
                  floatingLabelText='比分'
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Field
                  name='message'
                  component={TextField}
                  multiLine
                  hintText='添加这一刻的心情...'
                  floatingLabelText='添加这一刻的心情...'
                  fullWidth
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <AddImage
                  uploadedImages={time.imageList}
                  addImage={addImage}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Field name='permission' defaultSelected='0' component={RadioButtonGroup}>
                  <RadioButton
                    value='0'
                    label='公开'
                    style={fieldStyle.radioButton}
                    iconStyle={({fill: 'white'})}
                    labelStyle={({color: 'white'})}
                  />
                  <RadioButton
                    value='1'
                    label='只有我的朋友可以看见'
                    style={fieldStyle.radioButton}
                    iconStyle={({fill: 'white'})}
                    labelStyle={({color: 'white'})}
                  />
                  <RadioButton
                    value='2'
                    label='只有我能看见'
                    style={fieldStyle.radioButton}
                    iconStyle={({fill: 'white'})}
                    labelStyle={({color: 'white'})}
                  />
                </Field>
              </Col>
            </Row>
          </Grid>
        </div>
      </form>
    </div>  
  }
}

const MyForm = reduxForm({
  form: 'AddMatchForm',
  validate,
  onSubmit: (values, dispatch, props) => {
    const { time, addTimeMatch, goBack, user } = props

    addTimeMatch({
      ...values,
      date: formatDate(values.date),
      imgs: time.imageList,
      type: 'Match',
      userId: user.id
    }).then(() => {
      goBack()
    })
  },
})(AddMatch)

const mapStateToProps = state => ({
  time: state.time,
  user: state.user.user,
  initialValues: {
    permission: '0',
    date: new Date,
  },
})

export default connect(mapStateToProps, {
  push,
  goBack,
  addImage,
  clearTimeImage,
  addTimeMatch,
  submit,
})(MyForm)
