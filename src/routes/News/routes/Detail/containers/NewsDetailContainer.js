import React, { Component } from 'react'
import { connect } from 'react-redux'

import NewsDetail from '../components/NewsDetail'
import { fetchNews } from '../modules/newsDetail'

const mapStateToProps = (state) => ({
  news: state.newsDetail.news
})

export default connect(
  mapStateToProps,
  {
    fetchNews
  },
)(NewsDetail)
