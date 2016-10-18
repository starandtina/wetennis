import React from "react";
import cs from "./TopNav.scss";

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transparent: props.transparent
    }
  }

  componentDidMount() {
    const {transparent} = this.props;
    if (transparent) {
      document.addEventListener('scroll', this.transparentControll);
    }
  }

  componentWillUnmount() {
    const {transparent} = this.props;
    if (transparent) {
      document.removeEventListener('scroll', this.transparentControll);
    }
  }

  transparentControll = () => {
    const top = window.pageYOffset;
    const { transparent } = this.state;
    let newTransparent = transparent;
    if (top > 10) {
      newTransparent = false;
    } else {
      newTransparent = true;
    }
    if (newTransparent === transparent) return;
    this.setState({transparent: newTransparent});
  }  
  
  render() {
    const {title, children, className, transparent, ...props} = this.props;
    const stateTransparent = this.state.transparent;
    let childRefs = {};
    children && children.forEach(item => {
      childRefs[item.ref] = item;
    });
    return (
      <div className={`${className ? className : ""} ${cs.container} ${stateTransparent ? cs.transparent : ''}`} {...props}>
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
