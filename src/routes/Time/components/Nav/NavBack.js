import React from 'react'
import { browserHistory } from 'react-router'

import cs from './NavBack.scss'
import cs1 from "./TopNav.scss";

const goBack = (e) => {
  e.preventDefault()
  return browserHistory.goBack()
}

class TopNav extends React.Component {
  render() {
    const {title, children, className, ...props} = this.props;
    let childRefs = {};
    children.forEach(item => {
      childRefs[item.ref] = item;
    });
    return (
      <div className={`${className ? className : ""} ${cs1.container}`} {...props}>
        <div className={cs1.title}>
          {title || ""}
        </div>
        <div className={cs1.left}>
          {childRefs['left'] || undefined}
        </div>
        <div className={cs1.right}>
          {childRefs['right'] || undefined}
        </div>
      </div>
    );
  }
}

export default class NavBack extends React.Component {
  render() {
    const {children, caption, ...props} = this.props;
    return (
      <TopNav title={caption} {...props}>
        <div ref="left" onClick={goBack} className={cs.left}>
          <i className={`material-icons ${cs.navBackIcon}`}>close</i>
        </div>
        <div ref="right">{children}</div>
      </TopNav>
    );
  }
}
