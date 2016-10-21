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
    const { name, username, gender, personCard, passport, phone, companyName, companyTitle, club } = values;
    if (name && username && gender && (personCard || passport) && phone) {
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
        personCard,
        passport,
        companyName,
        companyTitle,
        club,
        },
      handleSubmit
      } = this.props

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
                  textAlign: 'left'
                }}
                name="gender"
                fullWidth
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
                    textAlign: 'left'
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
                  errorText={username.error}
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
                    errorText={gender.error}
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
                  errorText={name.error}
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
                  errorText={phone.error}
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
                  name="personCard"
                  fullWidth
                  {...personCard}
                  errorText={personCard.error}
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
                  errorText={passport.error}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>工作单位</label>
              </Col>
              <Col xs={8}>
                <TextField
                  inputStyle={{
                    textAlign: 'left'
                  }}
                  name="companyName"
                  fullWidth
                  {...companyName}
                  errorText={companyName.error}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>职务</label>
              </Col>
              <Col xs={8}>
                <TextField
                  inputStyle={{
                    textAlign: 'left'
                  }}
                  name="companyTitle"
                  fullWidth
                  {...companyTitle}
                  errorText={companyTitle.error}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>所属俱乐部</label>
              </Col>
              <Col xs={8}>
                <TextField
                  inputStyle={{
                    textAlign: 'left'
                  }}
                  name="club"
                  fullWidth
                  {...club}
                  errorText={club.error}
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

