import React from 'react'
import { browserHistory } from 'react-router'
import TopNav from "../TopNav";
import {history} from '../../main.js'

import cs from './NavBack.scss'

export default class NavBack extends React.Component {
  goBack = e => {
    const { routes } = this.props

    e.preventDefault();
    const pathname = window.location.pathname;
    let currentRoute = routes[routes.length - 1].path;
    const paths = routes.map(item => item.path).join('/').replace(/\/\//g, '/');
    const regText = paths.replace(/:[a-zA-Z0-9]+/g, '\(\.\+\)').replace(/\//g, '\/');
    const reg = new RegExp(regText);
    const v = reg.exec(pathname);
    const p = reg.exec(paths);
    p.shift();
    v.shift();
    const params = {};
    p.forEach((item, index) => {
      currentRoute = currentRoute.replace(item, v[index]);
    });
    const newPath = pathname.replace(`/${currentRoute}`, '');
    history.replace(newPath);
  }

  render() {
    const {children, title, caption, leftText, routes, hiddenBack, transparent = true, removeColor, handleGoBack, ...props} = this.props;
    const backIcon = hiddenBack ? null : <i className={`material-icons ${removeColor ? '' : cs.navBackIcon}`}>{leftText||'keyboard_backspace'}</i>;
    return (
      <TopNav title={caption || title || "wetennis"} transparent={transparent} {...props}>
        <div ref="left" onClick={handleGoBack || this.goBack} className={cs.left}>
          {backIcon}
        </div>
        <div ref="right">{children}</div>
      </TopNav>
    );
  }
}
