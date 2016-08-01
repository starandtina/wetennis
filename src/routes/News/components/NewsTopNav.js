import React from 'react'
import TopNav from 'components/TopNav'

export default ({}) => {
  return (
    <div>
      <TopNav title='最新新闻'>
        <div ref='left'></div>
        <div ref='right'></div>
      </TopNav>
    </div>
  );
}
