import React from "react";
import CommentsContainer from "components/Comments/CommentsContainer";
import ccs from "./common.scss";

const Comments = ({data, groupId, likeAction, sendAction}) => {
  return (
    <CommentsContainer className={ccs.comments} type="event" id={groupId} />
  );
}

export default Comments;
