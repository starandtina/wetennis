import React from "react";

import cs from "./User.scss";

export default ({data, min}) =>  {
  return (
    <div className={cs.user}>
      <img
        className={`${min ? cs.userimageL : cs.userimage}`}
        src={data.userimage}
      />
      <div className={cs.username}>{data.username}</div>
    </div>
  );
}
