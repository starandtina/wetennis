import React from "react";

import User from "../User";

import cs from "./ScoreItem.scss";

export default ({user, doubles, children, className, ...props}) => {
  let item;
  if (Array.isArray(user)) {
    item = (
      <div className={cs.scoreLeft}>
        {user.map((item, index) => {
          return (
            <div className={cs.scoreUser} key={index}>
              <User min={doubles} data={item} />
            </div>
          );
        })}
      </div>
    );
  } else if(user) {
    item = <User className={cs.scoreLeft} data={user} />;
  }
  return (
    <div {...props} className={`clearfix ${className ? className : ""} ${doubles ? cs.scoreItemMax : cs.scoreItem}`}>
      {item}
      <div className={cs.scoreRight}>{children}</div>
    </div>
  );
}
