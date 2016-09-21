import React from 'react'
import CommentsContainer from "components/Comments/CommentsContainer";

import ccs from './NewsComments.scss'

const NewsComments = ({ groupId }) => {
  return (
   <CommentsContainer type='news' id={groupId} />
  )
}

export default NewsComments
