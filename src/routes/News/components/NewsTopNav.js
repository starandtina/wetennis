import React, { Component } from 'react'
import { connect } from 'react-redux'

import TopNav from 'components/TopNav'
import { cls } from 'utils'
import { setProviderFilter } from '../modules/newsList'

import cs from './NewsTopNav.scss'

class NewsTopNav extends Component {
  render() {
    const { newsList, providerFilter, providerList } = this.props

    return (
      <div className={cs.container}>
        <TopNav title='最新新闻' transparent>
          <div ref='left'></div>
          <div ref='right'>
            <div className={cs.container}>
              <span>
                {providerFilter || providerList[0]}
                <i className='material-icons'>more_vert</i>
                <select
                  className='dropdown'
                  onChange={this.setProviderFilter}
                >
                  {providerList.map((item, index) => {
                    return (
                      <option key={index} value={item}>{item}</option>
                    );
                  })}
                </select>
              </span>
            </div>
          </div>
        </TopNav>
      </div>
    )
  }

  setProviderFilter = (e) => {
    const { setProviderFilter } = this.props
    setProviderFilter(e.target.value)
  }
}

export default connect(
  null,
  {
    setProviderFilter
  },
)(NewsTopNav)
