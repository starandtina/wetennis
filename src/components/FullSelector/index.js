import React from "react";
import cs from "./FullSelector.scss";

// ---------------------------
//  example:
//  const data = [
//    {text: "abc", value: 1},
//    {text: "bcd", value: 2},
//  ];
//  <FullSelector
//    align="left"
//    data={data}
//    selected={data[0]}
//    onChange={this.select}
//  />
// ---------------------------


export default class FullSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show || false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show 
    });
  }

  render() {
    const {show} = this.state;
    let {data, align, selected} = this.props;
    data = data || [];
    return (
      <div className={`${cs.container} ${show ? cs.show : ""}`} >
        <div onClick={this.onClose} className={cs.mask}></div>
        <ul className={`${cs.list} ${cs[align] || ""}`}>
          {data.map((item, index) => {
            return (
              <li
                className={`${cs.listItem} ${selected.value === item.value ? cs.active : ""}`}
                onClick={this.onChange.bind(this, item)}
                key={index}
              >{item.text}</li>
            )
          })}
        </ul>
      </div>
    );
  }

  onChange(item) {
    const {onChange} = this.props;
    onChange && onChange(item);
  }

  onClose = () => {
    this.setState({
      show: false 
    });
  }
}
