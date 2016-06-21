import React from 'react'

import RefereeTopNav from '../components/RefereeTopNav'
import EventPlayerScore from '../components/EventPlayerScore'
import EventOperationRegion from '../components/EventOperationRegion'

import classes from './Referee.scss'

class Referee extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={classes.container}>
        <RefereeTopNav></RefereeTopNav>
        <EventPlayerScore></EventPlayerScore>
        <EventOperationRegion></EventOperationRegion>
      </div>
    )
  }
}

export default Referee
