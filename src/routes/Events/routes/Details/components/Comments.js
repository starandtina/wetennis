import React from "react";
import CommentsComponent from "components/Comments";
import ccs from "./common.scss";


const Comments = ({data, likeAction, sendAction}) => {
  const like = (groupId, itemId) => {
    likeAction(groupId, itemId);
  };

  const send = (groupId, text) => {
    sendAction(groupId, text);
  };
  return (
    <div>
      <h3 className={ccs.boxTitle}>{`评论 (${data.total})`}</h3>
      <CommentsComponent
        data={data.comments}
        likeAction={like.bind(this, data.groupId)}
        sendAction={send.bind(this, data.groupId)}
      />
    </div>
  );
}

export default Comments;
