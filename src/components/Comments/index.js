import React, {Component} from "react";
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
  render() {
    const {data} = this.props;
    return (
      <div>
        <div>
          {data.map((item, index) => {
            return (
              <CommentItem
                likeAction={this.like.bind(this, item.id)}
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
            ref="commentMessageBox"
          />
          <button
            type="button"
            className={cs.sendMessage}
            onClick={this.send}
          >发表</button>
        </div>
      </div>
    );
  }
  like = id => {
    const {groupId, likeAction} = this.props;
    likeAction(groupId, id);
  }
  send = () => {
    const {groupId, sendAction} = this.props;
    const input = this.refs["commentMessageBox"];
    const text = input.value.trim();
    if (text) {
      sendAction(groupId, text);
      input.value = "";
    }
  }
}

export default Comments;
