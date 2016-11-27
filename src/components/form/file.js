import React, { PropTypes, Component } from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import { FormattedMessage } from 'react-intl';

import messages from 'locales/messages';
import style from './file.less';

const FormItem = Form.Item;

class FormFile extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    layout: PropTypes.object,
    label: PropTypes.string,
    disabled: PropTypes.bool,
  };
  static defaultProps = {
    disabled: false,
  };

  render() {
    const {
      input,
      label,
      disabled,
      layout,
      meta: { touched, error },
      } = this.props;
    const change = event => {
      input.onChange(event.target.files[0]);
    };
    return (
      <FormItem
        validateStatus={(touched && error) ? 'error' : ''}
        help={touched && error}
        label={label}
        {...layout}
      >
        <label className="ant-btn ant-btn">
          <FormattedMessage {...messages.chooseFile} />
          <Input
            type="file"
            style={{ display: 'none' }}
            {...input}
            accept=".xls,.xlsx,.csv"
            disabled={disabled}
            value={null}
            onChange={change}
          />
        </label>
        <span className={style.FileName}>{input.value && input.value.name}</span>
      </FormItem>
    );
  }
}

export default FormFile;
