import React from 'react'
import { Field } from 'redux-form'
import {
  RadioButtonGroup,
  TextField,
  SelectField,
} from 'redux-form-material-ui'
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

  uploadUserInfo = () => {
    const { uploadUserInfo, push, params, formValues } = this.props;
    const eventId = params.eventId;
    const { name, username, gender, personCard, passport, phone } = formValues;
    if (name && username && gender && (personCard || passport) && phone) {
      uploadUserInfo(formValues);
      push(`/events/${eventId}/register/announcement`)
    } else {
      alert('请完整填写信息')
    }
  };

  render() {
    const {
      group,
      item,
      partnerId,
      partners,
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
              <Field
                component={TextField}
                inputStyle={{
                    textAlign: 'left'
                  }}
                name="usernameForPartner"
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
              <Field
                component={TextField}
                inputStyle={{
                  textAlign: 'left'
                }}
                name="genderForPartner"
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
              <Field
                component={TextField}
                inputStyle={{
                    textAlign: 'left'
                  }}
                name="nameForPartner"
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
              <Field
                component={TextField}
                inputStyle={{
                    textAlign: 'left'
                  }}
                name="phoneForPartner"
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
                <Field
                  component={TextField}
                  inputStyle={{
                    textAlign: 'left'
                  }}
                  name="username"
                  fullWidth
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>性别</label>
              </Col>
              <Col xs={8}>
                <Field
                  name="gender"
                  component={SelectField}
                  value={this.state.gender}
                  fullWidth
                >
                  <MenuItem value='male' primaryText="男" />
                  <MenuItem value='female' primaryText="女" />
                </Field>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>真实姓名</label>
              </Col>
              <Col xs={8}>
                <Field
                  inputStyle={{
                    textAlign: 'left'
                  }}
                  name="name"
                  fullWidth
                  component={TextField}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>电话</label>
              </Col>
              <Col xs={8}>
                <Field
                  inputStyle={{
                    textAlign: 'left'
                  }}
                  name="phone"
                  fullWidth
                  component={TextField}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>身份证号</label>
              </Col>
              <Col xs={8}>
                <Field
                  inputStyle={{
                    textAlign: 'left'
                  }}
                  name="personCard"
                  fullWidth
                  component={TextField}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>护照</label>
              </Col>
              <Col xs={8}>
                <Field
                  inputStyle={{
                    textAlign: 'left'
                  }}
                  name="passport"
                  fullWidth
                  component={TextField}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>工作单位</label>
              </Col>
              <Col xs={8}>
                <Field
                  inputStyle={{
                    textAlign: 'left'
                  }}
                  name="companyName"
                  fullWidth
                  component={TextField}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>职务</label>
              </Col>
              <Col xs={8}>
                <Field
                  inputStyle={{
                    textAlign: 'left'
                  }}
                  name="companyTitle"
                  fullWidth
                  component={TextField}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>所属俱乐部</label>
              </Col>
              <Col xs={8}>
                <Field
                  inputStyle={{
                    textAlign: 'left'
                  }}
                  name="club"
                  fullWidth
                  component={TextField}
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

