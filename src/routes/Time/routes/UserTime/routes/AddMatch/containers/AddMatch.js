import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux'
import { reduxForm, getFormValues, Field } from 'redux-form'
import { Grid, Row, Col } from 'react-bootstrap';
import { RadioButton } from 'material-ui/RadioButton';
import {
  RadioButtonGroup,
  TextField,
  DatePicker,
} from 'redux-form-material-ui'

import { uploadTimeImage, clearTimeImage, addTimeMessage as addTimeMatch } from '../../../../../actions';
import NavBack from 'components/NavBack';
import AddImage from '../../../../../components/addImage';
import style from './AddMatch.scss';

const formatDate = date => {
  var year = date.getFullYear();
  var month = date.getMonth() < 9 ? '0'+ (date.getMonth()+1) : date.getMonth()+1

  var day =  date.getDate() < 10 ? '0'+ date.getDate(): date.getDate()
  return (year+'-'+month+'-'+day);
};

const validate = (values) => {
  var errors = {};
  var hasErrors = false;
  console.log(values);
  if (!values.message || values.message.trim() === '') {
    errors.message = '请添加心情';
    hasErrors = true;
  }
  if (!values.date) {
    errors.date = '请选择时间';
    hasErrors = true;
  }
  if (!values.location || values.location.trim() === '') {
    errors.location = '请输入地点';
    hasErrors = true;
  }
  if (!values.match || values.match.trim() === '') {
    errors.match = '请选择比赛类型';
    hasErrors = true;
  }
  if (!values.us || values.us.trim() === '') {
    errors.us = '请输入本方选手';
    hasErrors = true;
  }
  if (!values.ourScore || values.ourScore.trim() === '') {
    errors.ourScore = '请输入比分';
    hasErrors = true;
  } else if (Number(values.ourScore) > 7) {
    errors.ourScore = '比分错误';
    hasErrors = true;
  }
  if (!values.opponent || values.opponent.trim() === '') {
    errors.opponent = '请输入对手';
    hasErrors = true;
  }
  if (!values.opponentScore || values.opponentScore.trim() === '') {
    errors.opponentScore = '请输入比分';
    hasErrors = true;
  } else if (Number(values.opponentScore) > 7) {
    errors.opponentScore = '比分错误';
    hasErrors = true;
  }

  return hasErrors && errors;
}

const mapStateToProps = (state) => ({
  time: state.time,
  user: state.user.user,
  initialValues: {
    permission: "0",
    date: new Date
  },
  formValues: getFormValues('AddMatchForm')(state)
});

const mapDispatchToProps = {
  push,
  goBack,
  uploadTimeImage,
  clearTimeImage,
  addTimeMatch
};

class AddMatch extends Component {

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

  addMatch = () => {
    const { formValues, time, addTimeMatch, goBack, user } = this.props;
    console.log(formValues);
    addTimeMatch({
      ...formValues,
      date: formatDate(formValues.date),
      imgs: time.imageList,
      type: "Match",
      userId: user.id
    }).then(() => {
      goBack();
    })
  };

  render() {
    const {
      handleSubmit,
      submitting,
      time,
      uploadTimeImage
      } = this.props;
    const fieldStyle = {
      radioButton: {
        marginBottom: 16,
        color: 'white'
      }
    };
    return (
      <form className={style.Root} onSubmit={handleSubmit(this.addMatch)}>
        <NavBack routes={this.props.routes} caption="添加我的约球" leftText="close" transparent removeColor className='white-theme'>
          <button type="submit" disabled={submitting} className={style.Button}>
            <i className="material-icons">done</i>
          </button>
        </NavBack>
        <div className={style.Fields}>
          <Grid>
            <Row>
              <Col xs={6}>
                <Field
                  name="date"
                  component={DatePicker}
                  floatingLabelText="选择时间"
                  fullWidth
                  defaultDate={new Date}
                  maxDate={new Date}
                  autoOk
                />
              </Col>
              <Col xs={6}>
                <Field
                  name="location"
                  component={TextField}
                  fullWidth
                  floatingLabelText="选择地点..."
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Field
                  name="match"
                  component={TextField}
                  fullWidth
                  floatingLabelText="比赛"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Field
                  name="us"
                  component={TextField}
                  fullWidth
                  floatingLabelText="选手"
                />
              </Col>
              <Col xs={6}>
                <Field
                  name="ourScore"
                  type="number"
                  component={TextField}
                  fullWidth
                  floatingLabelText="比分"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Field
                  name="opponent"
                  component={TextField}
                  fullWidth
                  floatingLabelText="对手"
                />
              </Col>
              <Col xs={6}>
                <Field
                  name="opponentScore"
                  type="number"
                  component={TextField}
                  fullWidth
                  floatingLabelText="比分"
                />
              </Col>
            </Row>
          </Grid>
          <Field
            name="message"
            component={TextField}
            className={style.Message}
            multiLine
            hintText="添加这一刻的心情..."
            floatingLabelText="添加这一刻的心情..."
            fullWidth
            style={({paddingLeft:'15px', paddingRight: '15px'})}
          />
          <AddImage
            uploadedImages={time.imageList}
            addImage={uploadTimeImage}
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
  form: 'AddMatchForm',
  validate
})(AddMatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyForm)
