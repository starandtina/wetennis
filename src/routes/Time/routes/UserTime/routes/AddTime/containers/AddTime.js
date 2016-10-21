import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import { uploadTimeImage, clearTimeImage, addTimeMessage } from '../../../../../actions';
import NavBack from 'components/NavBack';
import AddImage from '../../../../../components/addImage';
import style from './AddTime.scss';

const formatDate = date => {
  var year = date.getFullYear();
  var month = date.getMonth() < 9 ? '0'+ (date.getMonth()+1) : date.getMonth()+1

  var day =  date.getDate() < 10 ? '0'+ date.getDate(): date.getDate()
  return (year+'-'+month+'-'+day);
}

const fields = ['message', 'permission']

const validate = (values) => {
  var errors = {};
  var hasErrors = false;

  if (!values.message || values.message.trim() === '') {
    errors.message = '请添加心情';
    hasErrors = true;
  }

  return hasErrors && errors;
}

const mapStateToProps = (state) => ({
  time: state.time,
  user: state.user.user,
  initialValues: {
    permission: "0"
  }
});


const mapDispatchToProps = ({
  push,
  goBack,
  uploadTimeImage,
  clearTimeImage,
  addTimeMessage
});

class AddTime extends Component {

  constructor(props) {
    super(props)
    document.querySelector('body').classList.add('u-backgroundColorGreen')
  }

  componentWillUnmount() {
    document.querySelector('body').classList.remove('u-backgroundColorGreen')
  }

  componentDidMount(){
    const { clearTimeImage } = this.props;
    clearTimeImage();
  }

  addTime = () => {
    const { values, time, addTimeMessage, push, goBack, user } = this.props;
    addTimeMessage({
      ...values,
      imgs: time.imageList,
      type: "Message",
      userId: user.id,
      date: formatDate(new Date)
    }).then(() => {
      debugger;
      //push('/time');
      goBack();
    })
  };

  render() {
    const {
      fields: { message, permission },
      handleSubmit,
      submitting,
      time,
      uploadTimeImage
      } = this.props;
    const fieldStyle = {
      radioButton: {
        marginBottom: 16,
        color: 'white',
      }
    };

    return (
    <form className={style.Root} onSubmit={handleSubmit(this.addTime)}>
      <NavBack caption="添加我的时光" leftText="close" transparent removeColor className='white-theme'>
        <button
          type="submit"
          disabled={submitting}
          className={style.Button}
        >
          <i className="material-icons">done</i>
        </button>
      </NavBack>
      <div className={style.Fields}>
        <TextField
          style={fieldStyle}
          fullWidth
          multiLine
          hintText="添加这一刻的心情..."
          errorText={message.touched ? message.error : ''}
          floatingLabelText="添加这一刻的心情..."
          {...message}
        />
        <AddImage
          uploadedImages={time.imageList}
          addImage={uploadTimeImage}
        />
        <RadioButtonGroup
          name="shipSpeed"
          defaultSelected="0"
          {...permission}
        >
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
        </RadioButtonGroup>
      </div>
    </form>
    )
  }
}

export default reduxForm({
  form: 'AddTimeForm',
  fields,
  validate
}, mapStateToProps, mapDispatchToProps)(AddTime)