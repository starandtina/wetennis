import Comments from "./index";
import {
  getComments, sendComment, likeComment, resetComment
} from "store/modules/comment";
import { connect } from 'react-redux'

const mapStateToProps = ({user, comments}) => ({
  userId: user.user.id,
  comments: comments.comments,
  total: comments.total
});

export default connect(
  mapStateToProps,
  {
    getComments, sendComment, likeComment, resetComment
  }
)(Comments);
