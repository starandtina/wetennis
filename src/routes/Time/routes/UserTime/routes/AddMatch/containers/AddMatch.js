import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux'
import { reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Grid, Row, Col } from 'react-bootstrap';
import DatePicker from 'material-ui/DatePicker';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import { uploadTimeImage, clearTimeImage, addTimeMessage as addTimeMatch } from '../../../../../actions';
import NavBack from 'components/NavBack';
import AddImage from '../../../../../components/addImage';
import style from './AddMatch.scss';

const fields = ['message', 'permission','date','location','match','us','ourScore','opponent','opponentScore'];
const formatDate = date => {
  var year = date.getFullYear();
  var month = date.getMonth() < 9 ? '0'+ (date.getMonth()+1) : date.getMonth()+1

  var day =  date.getDate() < 10 ? '0'+ date.getDate(): date.getDate()
  return (year+'-'+month+'-'+day);
}
const validate = (values) => {
  var errors = {};
  var hasErrors = false;

  if (!values.message || values.message.trim() === '') {
    errors.message = '请添加心情';
    hasErrors = true;
  }
  if (!values.date || values.date.trim() === '') {
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
    date: formatDate(new Date)
  }
});

const mapDispatchToProps = ({
  push,
  goBack,
  uploadTimeImage,
  clearTimeImage,
  addTimeMatch
});

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

  handleChangeDate = (dateField) => (empty, date) => {
    dateField.onChange(formatDate(date));
  };

  addMatch = () => {
    const { values, time, addTimeMatch, goBack, user } = this.props;
    addTimeMatch({
      ...values,
      imgs: time.imageList,
      type: "Match",
      userId: user.id
    }).then(() => {
      goBack();
    })
  };

  render() {
    const {
      fields: {
        message,
        permission,
        date,
        location,
        match,
        us,
        ourScore,
        opponent,
        opponentScore
        },
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
                <DatePicker
                  floatingLabelText="选择时间"
                  fullWidth
                  defaultDate={new Date}
                  maxDate={new Date}
                  onChange={this.handleChangeDate(date)}
                  autoOk
                  name="date"
                />
              </Col>
              <Col xs={6}>
                <TextField
                  fullWidth
                  floatingLabelText="选择地点"
                  errorText={location.touched ? location.error : ''}
                  floatingLabelText="选择地点..."
                  {...location}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <TextField
                  fullWidth
                  floatingLabelText="比赛"
                  errorText={match.touched ? match.error : ''}
                  {...match}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <TextField
                  fullWidth
                  floatingLabelText="选手"
                  errorText={us.touched ? us.error : ''}
                  {...us}
                />
              </Col>
              <Col xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  floatingLabelText="比分"
                  errorText={ourScore.touched ? ourScore.error : ''}
                  {...ourScore}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <TextField
                  fullWidth
                  floatingLabelText="对手"
                  errorText={opponent.touched ? opponent.error : ''}
                  {...opponent}
                />
              </Col>
              <Col xs={6}>
                <TextField
                  fullWidth
                  type="number"
                  floatingLabelText="比分"
                  errorText={opponentScore.touched ? opponentScore.error : ''}
                  {...opponentScore}
                />
              </Col>
            </Row>
          </Grid>
          <TextField
            className={style.Message}
            multiLine
            hintText="添加这一刻的心情..."
            errorText={message.touched ? message.error : ''}
            floatingLabelText="添加这一刻的心情..."
            {...message}
            fullWidth
            style={({paddingLeft:'15px', paddingRight: '15px'})}
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
  form: 'AddMatchForm',
  fields,
  validate
}, mapStateToProps, mapDispatchToProps)(AddMatch)
