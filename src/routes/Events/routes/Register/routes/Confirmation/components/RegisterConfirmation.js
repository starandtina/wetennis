import React from 'react'
import TextField from 'material-ui/TextField'
import { Grid, Row, Col } from 'react-bootstrap'

import classes from './RegisterConfirmation.scss'

export class RegisterConfirmation extends React.Component {
  render() {
    const { group, item, user } = this.props
console.log(user);
    return (
      <div className={classes.Root}>
        <div className={`${classes.header} text-muted`}>
          <h2>{group.name}</h2>
          <h4>{item.name}</h4>
        </div>
        <div>
          <Grid>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>用户名</label>
              </Col>
              <Col xs={8}>
                <TextField
                  inputStyle={{
                    textAlign: 'center'
                  }}
                  fullWidth
                  defaultValue={user.name}
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
                    textAlign: 'center'
                  }}
                  fullWidth
                  defaultValue={user.name}
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
                    textAlign: 'center'
                  }}
                  fullWidth
                  defaultValue={user.name}
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
                    textAlign: 'center'
                  }}
                  fullWidth
                  defaultValue={user.name}
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
                    textAlign: 'center'
                  }}
                  fullWidth
                  defaultValue={user.name}
                />
              </Col>
            </Row>
          </Grid>
          <div>Level: {user.level}</div>
        </div>
      </div>
    )
  }
}

export default RegisterConfirmation

