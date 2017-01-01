import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { reduxForm, Field, submit } from 'redux-form'
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

class AddTime extends PureComponent {
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

    submit('AddTimeForm')
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

    return <div className='container u-has-nav'>
      <NavBack routes={this.props.routes} caption='添加我的时光' leftText='close' transparent removeColor className='white-theme'>
        <i onClick={this.handleDoneClick} className='material-icons'>done</i>
      </NavBack>
      <form className={style.container} onSubmit={handleSubmit}>
        <div className={style.Fields}>
          <Field
            name='message'
            component={TextField}
            style={fieldStyle}
            fullWidth
            multiLine
            hintText='添加这一刻的心情...'
            floatingLabelText='添加这一刻的心情...'
          />
          <AddImage
            uploadedImages={time.imageList}
            addImage={addImage}
          />
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
        </div>
      </form>
    </div>
  }
}

const MyForm = reduxForm({
  form: 'AddTimeForm',
  validate,
  onSubmit: (values, dispatch, props) => {
    const { time, addTimeMessage, goBack, user } = props
    
    addTimeMessage({
      ...values,
      imgs: time.imageList,
      type: 'Message',
      userId: user.id,
      date: formatDate(new Date)
    }).then(({payload: { code }}) => {
      if (code === 0) {
        goBack()
      }
    })
  }
})(AddTime)

const mapStateToProps = (state) => ({
  time: state.time,
  user: state.user.user,
  initialValues: {
    permission: '0',
  },
})


export default connect(mapStateToProps, {
  goBack,
  addImage,
  clearTimeImage,
  addTimeMessage,
  submit,
})(MyForm)
