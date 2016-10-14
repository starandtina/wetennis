import React, { Component } from 'react'
import { Link } from 'react-router'

import cs from "./Comments.scss";

const CommentItem = ({data, likeAction, isLogin}) => {
  return (
    <div className={`clearfix ${cs.container}`}>
      <Link to={`/time/users/${data.id}`}><img className={cs.userimage} src={data.userimage} alt="" /></Link>
      <div className={cs.right}>
        <div className="clearfix">
          <div className={cs.username}>{data.username}</div>
          <div className={cs.time}>{data.time}</div>
          <div
            className={`${isLogin && data.like ? cs.like : ""} ${cs.likeNumber}`}
            onClick={likeAction}
          >
            {data.likenumber} <span className={`material-icons ${cs.likeIcon}`}>thumb_up</span>
          </div>
        </div>
        <div className={cs.context}>{data.context}</div>
      </div>
    </div>
  );
}

class Comments extends Component {
  componentDidMount() {
    const {getComments, type, id, userId} = this.props;
    getComments(userId, type, id);
  }
  componentWillUnmount() {
    const {resetComment} = this.props;
    resetComment()
  }
  render() {
    const {comments, userId, total, className} = this.props;
    return (
      <div className={className || ""}>
        <div className={cs.total}>{`评论 (${total})`}</div>
        <div>
          {comments.map((item, index) => {
            return (
              <CommentItem
                likeAction={this.like.bind(this, item.id)}
                isLogin={userId}
                data={item}
                key={index}
              />
            );
          })}
        </div>
        {userId
        ? <div className={cs.messageBox}>
            <input
              placeholder="我来说两句..."
              type="text"
              ref="commentMessageBox"
            />
            <button
              type="button"
              className={cs.sendMessage}
              onClick={this.send}
            >发表</button>
          </div>
        : undefined}
      </div>
    );
  }
  like = commentId => {
    const {likeComment, userId, type, id} = this.props;
    if (userId) {
      likeComment(userId, type, id, commentId);
    }
  }
  send = () => {
    const {id, sendComment, userId, type} = this.props;
    const input = this.refs["commentMessageBox"];
    const text = input.value.trim();
    if (text) {
      sendComment(userId, type, id, text);
      input.value = "";
    }
  }
}

export default Comments;
