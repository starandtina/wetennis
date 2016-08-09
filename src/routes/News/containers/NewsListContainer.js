import React, { Component } from 'react'
import { connect } from 'react-redux'

import NewsList from '../components/NewsList'
import { fetchNewsList } from '../modules/newsList'

const getProviderFilterList = (newsList = []) => ([ '全部', ...new Set(newsList.map(n => n.provider)) ])

const getVisibleNewsList = (newsList, providerFilter) => {
  if (providerFilter === '全部') {
    return newsList
  } else {
    return newsList.filter(n => n.provider === providerFilter)
  }
}

const mapStateToProps = (state) => ({
  providerList: getProviderFilterList(state.newsList.list),
  newsList: getVisibleNewsList(state.newsList.list, state.newsList.providerFilter),
  providerFilter: state.newsList.providerFilter
})

export default connect(
  mapStateToProps,
  {
    fetchNewsList
  },
)(NewsList)
