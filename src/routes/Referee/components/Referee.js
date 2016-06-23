import React from 'react'

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import RefereeTopNav from '../components/RefereeTopNav'
import EventPlayerScore from '../components/EventPlayerScore'
import EventOperationRegion from '../components/EventOperationRegion'

import classes from './Referee.scss'

class Referee extends React.Component {
  constructor(props) {
    super(props)
    document.querySelector('body').classList.add('u-backgroundColorBlack')
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className={classes.container}>
          <RefereeTopNav></RefereeTopNav>
          <EventPlayerScore></EventPlayerScore>
          <EventOperationRegion></EventOperationRegion>
        </div>
      </MuiThemeProvider>
    )
  }

  componentWillUnmount() {
    document.querySelector('body').classList.remove('u-backgroundColorBlack')
  }
}

export default Referee
