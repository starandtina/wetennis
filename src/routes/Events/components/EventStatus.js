import React from "react";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import cs from "./EventStatus.scss";

export default class EventStatus extends React.Component {
  render() {
    const {currentStatus, status} = this.props;
    return (
      <div className={cs.container}>
        <SelectField
          value={currentStatus || 0}
          onChange={this.selectStatus}
          underlineStyle={{display: "none"}}
        >
          {status.map((item, index) => {
            return (
              <MenuItem key={index} value={item.value} primaryText={item.text} />
            );
          })}
        </SelectField>
      </div>
    );
  }

  selectStatus = (e, index, value) => {
    const {selectStatus} = this.props;
    selectStatus(value);
  }
}
