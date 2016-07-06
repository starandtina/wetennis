import React from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
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

  handleChangeGender = (event, key, payload) => {
    this.setState({
      gender: payload,
    });
  }

  uploadUserInfo = () => {
    const { uploadUserInfo, push, params } = this.props;
    console.log(params);
    const eventId = params.eventId
    uploadUserInfo(this.state);
    push(`/events/${eventId}/register/announcement`)
  }

  render() {
    const { group, item, partnerId, partners } = this.props;
    const myPartner = partners.find(item => item.id == partnerId);
    console.log(myPartner);
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
                name="name"
                fullWidth
                disabled
                value={myPartner.name}
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
                name="phone"
                fullWidth
                disabled
                value={myPartner.gender}
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
                name="userName"
                fullWidth
                disabled
                value={myPartner.userName}
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
        <div className={classes.UserInfo}>
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
                  onChange={this.handleChange('name')}
                  defaultValue={this.state.name}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>性别</label>
              </Col>
              <Col xs={8}>
                <SelectField value={this.state.gender} onChange={this.handleChangeGender}>
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
                  name="userName"
                  fullWidth
                  onChange={this.handleChange('userName')}
                  defaultValue={this.state.userName}
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
                  onChange={this.handleChange('phone')}
                  defaultValue={this.state.phone}
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
                  onChange={this.handleChange('cardId')}
                  defaultValue={this.state.cardId}
                />
              </Col>
            </Row>
          </Grid>
          {partnerContent}
          <div className={`button-groups clearfix ${classes.ButtonGroups}`}>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              onClick={this.uploadUserInfo}
            >确认报名信息</button>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterConfirmation

