import React, { Component } from 'react'
import { connect } from 'react-redux'

import NewsDetail from '../components/NewsDetail'
import { fetchNews, fetchNewsComments, likeComment, saveCommentThenFetchComments } from '../modules/newsDetail'

const mapStateToProps = (state) => ({
  news: state.newsDetail.news,
  comments: state.newsDetail.comments
})

export default connect(
  mapStateToProps,
  {
    fetchNews,
    fetchNewsComments,
    likeComment,
    saveCommentThenFetchComments
  },
)(NewsDetail)
