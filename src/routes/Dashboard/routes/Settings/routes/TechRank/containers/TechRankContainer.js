import React, { PureComponent } from 'react';
import NavBack from 'components/NavBack'
import MenuItem from 'material-ui/MenuItem'
import { connect } from 'react-redux'
import { Field, getFormValues } from 'redux-form'

import { renderSelectField, renderTextField } from 'utils/form'
import cs from './TechRankContainer.scss';


class TechRank extends PureComponent {
  render() {
    const { settings: { SelfTechRank, OtherTechRank }, FinalRank } = this.props

    return (
      <div className='u-has-nav container'>
        <NavBack routes={this.props.routes} caption='网球等级' />
        <form className='form-horizontal'>
            <div className={cs.title}>网球等级</div>
            <Field name='SelfTechRank' value={SelfTechRank} label='自我评定' component={renderSelectField}>
              <MenuItem value={1} primaryText="1" />
              <MenuItem value={1.5} primaryText="1.5" />
              <MenuItem value={2} primaryText="2" />
              <MenuItem value={2.5} primaryText="2.5" />
              <MenuItem value={3} primaryText="3" />
              <MenuItem value={3.5} primaryText="3.5" />
              <MenuItem value={4} primaryText="4" />
              <MenuItem value={4.5} primaryText="4.5" />
              <MenuItem value={5} primaryText="5" />
            </Field>
            <Field name='OtherTechRank' label='对手评定' value={OtherTechRank} disabled component={renderTextField} />
        </form>
        <div className={`${cs.TechRank} u-aligner`}>{FinalRank}</div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  const formValues = getFormValues('SettingsForm')(state) || {}

  return {
    settings: state.settings,
    FinalRank: formValues.SelfTechRank ?
      (Number(formValues.SelfTechRank) + Number(formValues.OtherTechRank)) / 2 : formValues.OtherTechRank
  }
}

export default connect(
  mapStateToProps, null
)(TechRank)
