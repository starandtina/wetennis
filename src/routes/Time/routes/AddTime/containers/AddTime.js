import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import NavBack from '../../../components/Nav';
import style from './AddTime.scss';

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
  time: state.time
});

const mapDispatchToProps = ({
  push
});

class AddTime extends Component {

  constructor(props) {
    super(props)
    document.querySelector('body').classList.add('u-backgroundColorGreen')
  }

  componentWillUnmount() {
    document.querySelector('body').classList.remove('u-backgroundColorGreen')
  }

  signIn = () => {

  };

  render() {
    const {
      fields: { message, permission },
      handleSubmit,
      submitting,
      } = this.props;
    const fieldStyle = {
      radioButton: {
        marginBottom: 16,
        color: 'white',
      }
    };
    return (
    <form className={style.Root} onSubmit={handleSubmit(this.signIn)}>
      <NavBack caption="添加我的时光">
        <button type="submit" disabled={submitting}>
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