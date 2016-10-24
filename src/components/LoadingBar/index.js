import React, { Component } from 'react'

import CircularProgress from 'material-ui/CircularProgress'
import Dialog from 'material-ui/Dialog'

import cs from './index.scss'

const style = {
  refreshIndicator: {
    position: 'static',
    left: 'auto',
    top: 'auto',
    transform: 'inherit'
  }
}

export default class LoadingBar extends Component {
  render() {
    return (
      <div className={`u-aligner ${cs.backdrop}`}> 
        <CircularProgress />
      </div>
    );
  }
}

