import React from 'react'

import classes from './RegisterConfirmation.scss'

export class RegisterConfirmation extends React.Component {
  render() {
    const { group, item } = this.props

    return (
      <div>
        <div className={`${classes.header} text-muted`}>
          <h2>{group.name}</h2>
          <h4>{item.name}</h4>
        </div>
      </div>
    )
  }
}

export default RegisterConfirmation

