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
    const {children, title, caption, ...props} = this.props;
    return (
      <TopNav title={caption || title || "wetennis"} {...props}>
        <div ref="left" onClick={goBack} className={cs.left}>
          <i className={`material-icons ${cs.navBackIcon}`}>keyboard_backspace</i>
        </div>
        <div ref="right">{children}</div>
      </TopNav>
    );
  }
}
