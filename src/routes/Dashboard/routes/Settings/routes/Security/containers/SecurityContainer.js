import React, { PureComponent } from 'react';
import NavBack from 'components/NavBack'
import { connect } from 'react-redux'

import { Field } from 'redux-form'
import { renderSelectField, renderTextField } from 'utils/form'
import cs from './SecurityContainer.scss';

const mapStateToProps = (state) => ({
  settings: state.settings,
})

class Security extends PureComponent {
  render() {
    const { settings } = this.props

    return (
      <div className='u-has-nav container'>
        <NavBack routes={this.props.routes} caption='隐私'>
        </NavBack>

        <form className='setting-form form-horizontal'>
            <div className={cs.title}>隐私信息</div>
            <Field name='name' label='真实姓名' component={renderTextField} />
            <Field name='phone' label='电话' component={renderTextField} />
            <Field name='cardId' label='身份证号' component={renderTextField} />
            <Field name='companyName' label='工作单位' component={renderTextField} />
            <Field name='companyTitle' label='职务' component={renderTextField} />
            <Field name='club' label='所属俱乐部' component={renderTextField} />
        </form>
      </div>
    )
  }
}

export default connect(
  mapStateToProps, null
)(Security)
