import React, { Component } from 'react'

import RefreshIndicator from 'material-ui/RefreshIndicator'
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
      <div className={`u-verticalCenterWithFlex ${cs.backdrop}`}> 
        <RefreshIndicator
          size={50}
          left={0}
          top={0}
          status='loading'
          style={style.refreshIndicator}
        />
      </div>
    );
  }
}

