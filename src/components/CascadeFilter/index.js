import React, {Component} from "react";
import cs from "./cascade.scss";

// Example:
//
// <CascadeFilter
//   filters={[]}
//   filterKeys={["group", "subGroup"]}
//   onChange={(v) => {console.log(v)}}
// />


const Filter = ({data = [], active = {}, index, setValue}) => {
  return (
    <div className={cs.filter}>
      {active.text}
      <i className={`material-icons ${cs.filterIcon}`}>keyboard_arrow_down</i>
      <select
        className="dropdown"
        defaultValue={active.value}
        onChange={setValue}
      >
      {data.map((item, index) => {
        return (
          <option
            key={index}
            value={item.value}
          >{item.text}</option>
        );
      })}
      </select>
    </div>
  );
};

export default class CascadeFilter extends Component {
  componentWillReceiveProps(nextProps) {
    const {filters} = nextProps;
    if (this.state.filters.length === 0
        && Array.isArray(filters)
        && filters.length !== 0) {
      this.setChild([{
        active: filters[0],
        filter: filters
      }]);
    }
  }

  state = {
    filters: []
  }
  
  setValue(index, e) {
    let filters = this.state.filters.concat();
    const data = filters[index];
    const value = e.target.value;
    let active
    data.filter.forEach(item => {
      if (value == item.value) {
        active = item
      }
    })
    filters[index] = { active, filter: data.filter };
    filters = filters.slice(0, index + 1);
    this.setChild(filters);
  }

  setChild = (filters) => {
    if (filters.length === 0) return;
    const data = filters[filters.length - 1];
    if (data.active
        && Array.isArray(data.active.children)
        && data.active.children.length !== 0) {
      const children = data.active.children;
      filters.push({active: children[0], filter: children});
      this.setChild(filters);
    } else {
      const values = filters.map(item => item.active.value);
      const {filterKeys, onChange} = this.props;
      let v;
      if (Array.isArray(filterKeys)) {
        v = {}
        filterKeys.forEach((item, index) => {
          v[item] = values[index]
        })
      } else {
        v = values;
      }
      onChange(v);
      this.setState({ filters });
    }
  }

  render() {
    const {filters} = this.state;
    const {className} = this.props;
    return (
      <div className={`${className || ""} ${cs.box}`}>
        {filters.map((item, index) => {
          return (
            <Filter
              data={item.filter}
              active={item.active}
              setValue={this.setValue.bind(this, index)}
              index={index}
              key={index}
            />
          );
        })}
      </div>
    );
  }
}

