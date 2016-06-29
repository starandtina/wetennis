import React from "react";
import CommentsComponent from "components/Comments";
import ccs from "./common.scss";


const Comments = ({data, groupId, likeAction, sendAction}) => {
  return (
    <div>
      <h3 className={ccs.boxTitle}>{`评论 (${data.total})`}</h3>
      <CommentsComponent
        data={data.comments}
        groupId={groupId}
        likeAction={likeAction}
        sendAction={sendAction}
      />
    </div>
  );
}

export default Comments;
