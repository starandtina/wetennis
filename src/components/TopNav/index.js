import React from "react";
import cs from "./TopNav.scss";

export default class TopNav extends React.Component {
  render() {
    const {title, children} = this.props;
    let childRefs = {};
    children.forEach(item => {
      childRefs[item.ref] = item;
    });
    return (
      <div className={cs.container}>
        <div className={cs.title}>
          {title || ""}
        </div>
        <div className={cs.left}>
          {childRefs['left'] || undefined}
        </div>
        <div className={cs.right}>
          {childRefs['right'] || undefined}
        </div>
      </div>
    );
  }
}