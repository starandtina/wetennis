import React, { Component } from 'react';
import NavBack from 'components/NavBack'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Row, Col } from 'react-bootstrap';
import Divider from 'material-ui/Divider';
import { fetchMySettings, updateSettings } from 'routes/Dashboard/modules/settings'

import classes from './techRankContainer.scss';

const mapStateToProps = (state) => ({
  settings: state.settings
});

const mapDispatchToProps = {
  fetchMySettings,
  updateSettings
};

class TechRank extends Component {

  handleChangeSelfTechRank = (event, key, payload) => {
    const { updateSettings } = this.props;
    updateSettings({
      SelfTechRank: payload,
    });
  }

  render() {
    const {
      settings,
      } = this.props;
    const FinalRank = settings.SelfTechRank ? (Number(settings.SelfTechRank) + Number(settings.OtherTechRank)) / 2 : settings.OtherTechRank;
    const underlineStyle = {
      display: 'none'
    }
    return (
      <div class='u-has-nav'>
        <NavBack routes={this.props.routes} caption='网球等级' />
        <form className={classes.Form}>
          <Grid>
            <div className={classes.Head}>网球等级</div>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>自我评定</label>
              </Col>
              <Col xs={8}>
                <SelectField
                  fullWidth
                  value={settings.SelfTechRank}
                  onChange={this.handleChangeSelfTechRank}
                  underlineStyle={underlineStyle}
                  name="SelfTechRank"
                  style={{
                        color: '#929292',
                      }}
                >
                  <MenuItem value={1} primaryText="1" />
                  <MenuItem value={1.5} primaryText="1.5" />
                  <MenuItem value={2} primaryText="2" />
                  <MenuItem value={2.5} primaryText="2.5" />
                  <MenuItem value={3} primaryText="3" />
                  <MenuItem value={3.5} primaryText="3.5" />
                  <MenuItem value={4} primaryText="4" />
                  <MenuItem value={4.5} primaryText="4.5" />
                  <MenuItem value={5} primaryText="5" />
                </SelectField>
              </Col>
              <Divider />
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>对手评定</label>
              </Col>
              <Col xs={8}>
                <div className={classes.Text}>{settings.OtherTechRank}</div>
              </Col>
              <Divider />
            </Row>
            <Row>
              <Col xs={4}>
                <label className={classes.label}>综合评定</label>
              </Col>
              <Col xs={8}>
                <div className={classes.Text}>{FinalRank}</div>
              </Col>
              <Divider />
            </Row>
          </Grid>
        </form>
        <div className={classes.TechRank}>{FinalRank}</div>
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TechRank)
