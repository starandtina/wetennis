import React from "react";
import cs from "./Comments.scss";

const CommentItem = ({data, likeAction}) => {
  return (
    <div className={`clearfix ${cs.container}`}>
      <img className={cs.userimage} src={data.userimage} alt="" />
      <div className={cs.right}>
        <div className="clearfix">
          <div className={cs.username}>{data.username}</div>
          <div className={cs.time}>{data.time}</div>
          <div
            className={`${data.like ? cs.like : ""} ${cs.likeNumber}`}
            onClick={likeAction.bind(this, data.id)}
          >
            {data.likeNumber} <span className={`material-icons ${cs.likeIcon}`}>thumb_up</span>
          </div>
        </div>
        <div className={cs.context}>{data.context}</div>
      </div>
    </div>
  );
}


const Comments = ({data, likeAction, sendAction}) => {
  return (
    <div>
      <div>
        {data.map((item, index) => {
          return (
            <CommentItem
              likeAction={likeAction}
              data={item}
              key={index}
            />
          );
        })}
      </div>
      <div className={cs.messageBox}>
        <input
          placeholder="我来说两句..."
          type="text"
        />
        <button
          type="button"
          className={cs.sendMessage}
        >发表</button>
      </div>
    </div>
  );
}

export default Comments;
