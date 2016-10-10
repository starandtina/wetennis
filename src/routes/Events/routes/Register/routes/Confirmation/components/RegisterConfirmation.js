import React from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import { Grid, Row, Col } from 'react-bootstrap'

import classes from './RegisterConfirmation.scss'

export class RegisterConfirmation extends React.Component {
  state = {
    ...this.props.user,
  };

  handleChange = field => ({ target: { value } }) => {
    this.setState({
      [field]: value,
    });
  };

  handleChangeGender = gender => (event, key, payload) => {
    gender.onChange(payload);
  }

  uploadUserInfo = () => {
    const { uploadUserInfo, push, params, values } = this.props;
    const eventId = params.eventId;
    const { name, username, gender, cardId, passport, phone, companyName, companyTitle } = values;
    if (name && username && gender && (cardId || passport) && phone) {
      uploadUserInfo(values);
      push(`/events/${eventId}/register/announcement`)
    } else {
      alert('请完整填写信息')
    }
  }

  render() {
    const {
      group,
      item,
      partnerId,
      partners,
      fields: {
        username,
        gender,
        name,
        phone,
        cardId,
        passport,
        companyName,
        companyTitle,
        },
      handleSubmit
      } = this.props;
    console.log({
      username,
      gender,
      name,
      phone,
      cardId
    });
    const myPartner = partners.find(item => item.id == partnerId);
    const partnerContent = item.needPartner ? (
      <div>
        <div className={`${classes.header} text-muted`}>
          搭档信息
        </div>
        <Grid>
          <Row>
            <Col xs={4}>
              <label className={classes.label}>用户名</label>
            </Col>
            <Col xs={8}>
              <TextField
                inputStyle={{
                    textAlign: 'left'
                  }}
                name="username"
                fullWidth
                disabled
                value={myPartner.username}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <label className={classes.label}>性别</label>
            </Col>
            <Col xs={8}>
              <TextField
                inputStyle={{
                    textAlign: 'left',
                    width: '220px'
                  }}
                name="gender"
                disabled
                value={myPartner.gender === "female" ? "女" : "男"}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <label className={classes.label}>真实姓名</label>
            </Col>
            <Col xs={8}>
              <TextField
                inputStyle={{
                    textAlign: 'left'
                  }}
                name="name"
                fullWidth
                disabled
                value={myPartner.name}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <label className={classes.label}>电话</label>
            </Col>
            <Col xs={8}>
              <TextField
                inputStyle={{
                    textAlign: 'left',
                     width: '220px'
                  }}
                name="phone"
                fullWidth
                disabled
                value={myPartner.phone}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    ) : null;
    return (
      <div className={classes.Root}>
        <div className={`${classes.header} text-muted`}>
          <h2>{group.name}</h2>
          <h4>{item.name}</h4>
        </div>
        <form className={classes.UserInfo} onSubmit={handleSubmit(this.uploadUserInfo)}>
          <Grid>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>用户名</label>
              </Col>
              <Col xs={8}>
                <TextField
                  inputStyle={{
                    textAlign: 'left'
                  }}
                  name="name"
                  fullWidth
                  {...username}
                  errorText={username.touched && username.error}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>性别</label>
              </Col>
              <Col xs={8}>
                <SelectField
                    value={this.state.gender}
                    fullWidth
                    {...gender}
                    onChange={this.handleChangeGender(gender)}
                    errorText={gender.touched && gender.error}
                >
                  <MenuItem value='male' primaryText="男" />
                  <MenuItem value='female' primaryText="女" />
                </SelectField>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>真实姓名</label>
              </Col>
              <Col xs={8}>
                <TextField
                  inputStyle={{
                    textAlign: 'left'
                  }}
                  name="name"
                  fullWidth
                  {...name}
                  errorText={name.touched && name.error}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>电话</label>
              </Col>
              <Col xs={8}>
                <TextField
                  inputStyle={{
                    textAlign: 'left'
                  }}
                  name="phone"
                  fullWidth
                  {...phone}
                  errorText={phone.touched && phone.error}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>身份证号</label>
              </Col>
              <Col xs={8}>
                <TextField
                  inputStyle={{
                    textAlign: 'left'
                  }}
                  name="cardId"
                  fullWidth
                  {...cardId}
                  errorText={cardId.touched && cardId.error}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>护照</label>
              </Col>
              <Col xs={8}>
                <TextField
                  inputStyle={{
                    textAlign: 'left'
                  }}
                  name="passport"
                  fullWidth
                  {...passport}
                  errorText={passport.touched && passport.error}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>公司名称</label>
              </Col>
              <Col xs={8}>
                <TextField
                  inputStyle={{
                    textAlign: 'left'
                  }}
                  name="companyName"
                  fullWidth
                  {...companyName}
                  errorText={companyName.touched && companyName.error}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>公司职位</label>
              </Col>
              <Col xs={8}>
                <TextField
                  inputStyle={{
                    textAlign: 'left'
                  }}
                  name="companyTitle"
                  fullWidth
                  {...companyTitle}
                  errorText={companyTitle.touched && companyTitle.error}
                />
              </Col>
            </Row>
          </Grid>
          {partnerContent}
          <div className={`button-groups clearfix ${classes.ButtonGroups}`}>
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block"
            >确认报名信息</button>
          </div>
        </form>
      </div>
    )
  }
}

export default RegisterConfirmation

