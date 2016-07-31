import React from "react";

import ccs from "./common.scss";
import cs from "./Sponsor.scss";

const Notice = ({data}) => {
  if (!data || data.length === 0) {
    return <div></div>;
  }
  return (
    <div>
      <h3 className={`${ccs.boxTitle}`}>赞助商</h3>
      <ul className={`${cs.list}`}>
        {data.map((item, index) => {
          return (
            <li key={index}>
              <img src={item.thumb} className={cs.thumb} alt="" />
              <div className={cs.name}>{item.name}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Notice;
