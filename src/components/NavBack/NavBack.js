import React from 'react'
import { browserHistory } from 'react-router'
import TopNav from "../TopNav";

import cs from './NavBack.scss'

const goBack = (e) => {
  e.preventDefault()
  return browserHistory.goBack()
}

export default class NavBack extends React.Component {
  render() {
    const {children, title, caption, leftText, hiddenBack, transparent = true, ...props} = this.props;
    const backIcon = hiddenBack ? null : <i className={`material-icons ${this.props.removeColor ? '' : cs.navBackIcon}`}>{leftText||'keyboard_backspace'}</i>;
    return (
      <TopNav title={caption || title || "wetennis"} transparent={transparent} {...props}>
        <div ref="left" onClick={goBack} className={cs.left}>
          {backIcon}
        </div>
        <div ref="right">{children}</div>
      </TopNav>
    );
  }
}
