import React, { Component } from 'react';
import NavBack from 'components/NavBack'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Row, Col } from 'react-bootstrap';
import Divider from 'material-ui/Divider';
import { updateUserInfo } from 'routes/Dashboard/modules/user'

import classes from './securityContainer.scss';

const mapStateToProps = (state) => ({
  settings: state.settings,
  user: state.user
});

const mapDispatchToProps = {
  updateUserInfo,
};

class Security extends Component {

  handleChange = field => ({ target: { value } }) => {
    const { updateUserInfo } = this.props;
    updateUserInfo({
      [field]: value,
    });
  };

  render() {
    const {
      user: { user },
      } = this.props;
    const underlineStyle = {
      display: 'none'
    }
    console.log(user);
    return (
      <div>
        <NavBack caption='隐私'>
        </NavBack>

        <form className='setting-form'>
          <Grid>
            <div className={classes.Head}>隐私信息</div>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>真实姓名</label>
              </Col>
              <Col xs={8}>
                <TextField
                  inputStyle={{
                        textAlign: 'left',
                        color: '#929292',
                      }}
                  name="name"
                  fullWidth
                  onChange={this.handleChange('name')}
                  value={user.name}
                  underlineShow={false}
                />
              </Col>
              <Divider />
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>电话</label>
              </Col>
              <Col xs={8}>
                <TextField
                  inputStyle={{
                        textAlign: 'left',
                        color: '#929292',
                      }}
                  name="phone"
                  fullWidth
                  onChange={this.handleChange('phone')}
                  value={user.phone}
                  underlineShow={false}
                />
              </Col>
              <Divider />
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>身份证号</label>
              </Col>
              <Col xs={8}>
                <TextField
                  inputStyle={{
                        textAlign: 'left',
                        color: '#929292',
                      }}
                  name="card"
                  fullWidth
                  onChange={this.handleChange('card')}
                  value={user.card}
                  underlineShow={false}
                />
              </Col>
              <Divider />
            </Row>
          </Grid>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Security)
