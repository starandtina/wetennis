import React, { Component } from 'react'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { reduxForm, getFormValues, Field } from 'redux-form'
import { RadioButton } from 'material-ui/RadioButton'
import {
  RadioButtonGroup,
  TextField,
} from 'redux-form-material-ui'

import { addImage, clearTimeImage, addTimeMessage } from 'routes/Time/modules'
import NavBack from 'components/NavBack'
import AddImage from 'routes/Time/components/addImage'
import style from './AddTime.scss'

const formatDate = date => {
  var year = date.getFullYear()
  var month = date.getMonth() < 9 ? '0'+ (date.getMonth()+1) : date.getMonth()+1

  var day =  date.getDate() < 10 ? '0'+ date.getDate(): date.getDate()
  return (year+'-'+month+'-'+day)
}

const validate = values => {
  var errors = {}
  var hasErrors = false

  if (!values.message || values.message.trim() === '') {
    errors.message = '请添加心情'
    hasErrors = true
  }

  return hasErrors && errors
}

const mapStateToProps = (state) => ({
  time: state.time,
  user: state.user.user,
  initialValues: {
    permission: "0"
  },
  formValues: getFormValues('AddTimeForm')(state)
})


const mapDispatchToProps = ({
  goBack,
  addImage,
  clearTimeImage,
  addTimeMessage
})

class AddTime extends Component {

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

  addTime = () => {
    const { formValues, time, addTimeMessage, goBack, user } = this.props
    addTimeMessage({
      ...formValues,
      imgs: time.imageList,
      type: "Message",
      userId: user.id,
      date: formatDate(new Date)
    }).then(() => {
      goBack()
    })
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
        color: 'white'
      }
    }

    return (
    <form className={style.Root} onSubmit={handleSubmit(this.addTime)}>
      <NavBack routes={this.props.routes} caption="添加我的时光" leftText="close" transparent removeColor className='white-theme'>
        <button
          type="submit"
          disabled={submitting}
          className={style.Button}
        >
          <i className="material-icons">done</i>
        </button>
      </NavBack>
      <div className={style.Fields}>
        <Field
          name="message"
          component={TextField}
          style={fieldStyle}
          fullWidth
          multiLine
          hintText="添加这一刻的心情..."
          floatingLabelText="添加这一刻的心情..."
        />
        <AddImage
          uploadedImages={time.imageList}
          addImage={addImage}
        />
        <Field name="permission" defaultSelected="0" component={RadioButtonGroup}>
          <RadioButton
            value="0"
            label="公开"
            style={fieldStyle.radioButton}
            iconStyle={({fill: 'white'})}
            labelStyle={({color: 'white'})}
          />
          <RadioButton
            value="1"
            label="只有我的朋友可以看见"
            style={fieldStyle.radioButton}
            iconStyle={({fill: 'white'})}
            labelStyle={({color: 'white'})}
          />
          <RadioButton
            value="2"
            label="只有我能看见"
            style={fieldStyle.radioButton}
            iconStyle={({fill: 'white'})}
            labelStyle={({color: 'white'})}
          />
        </Field>
      </div>
    </form>
    )
  }
}

const MyForm = reduxForm({
  form: 'AddTimeForm',
  validate
})(AddTime)

export default connect(mapStateToProps, mapDispatchToProps)(MyForm)
