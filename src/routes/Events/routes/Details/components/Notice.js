import React from "react";

import ccs from "./common.scss";
import cs from "./Notice.scss";

const Notice = ({data}) => {
  return (
    <div>
      <h3 className={`${ccs.boxTitle}`}>通知</h3>
      <ul className={`${cs.list}`}>
        {data.map((item, index) => {
          return (
            <li key={index}>
              <div className={`${cs.time}`}>{item.time}</div>
              <div className={cs.context}>{item.context}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Notice;
