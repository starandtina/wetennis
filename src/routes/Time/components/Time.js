import React, { PureComponent } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import Footer from 'components/Footer'
import TimeItem from './TimeItem'
import style from './Time.scss'

export default class Time extends PureComponent {
  state = {
    pageStart: -1,
  }

  componentDidMount(){
    const { fetchTimesList, location: { query }, clearTime, user: { user } } = this.props
    const userId = query.userId || user.id

    clearTime()
    
    fetchTimesList({
      id: userId,
      currentPage: 1,
      needLoading: true
    }).then(data => {
      this.setState({
        pageStart:0,
        hasMore: !data.payload.data.lastPage,
      })
    })
  }

  addNewTime = event => {
    const { user: { user } } = this.props
    const value = event.target.value
    const { push } = this.props
    push(`/time/${value}`)
  }

  loadData = () => {
    const { fetchTimesList, params, time: { currentPage }, user: { user } } = this.props
    fetchTimesList({
      currentPage: currentPage + 1,
      id: params.userId,
    }).then(action => {
      this.setState({
        pageStart:this.pageStart + 1,
        hasMore: !action.payload.data.lastPage
      })
    })
  }

  debounceFuc = this.loadData

  render() {
    const { time, children, fetchDeleteTime, location: { query }, user: { user } } = this.props
    let content = null
    let footer =  null
    const isGuess = query.userId &&  query.userId !== user.id
    
    if (children) {
      content = children
      footer =  null
    } else {
      const bgstyle = {
        backgroundColor: 'lightgray',
        backgroundImage:  `url(${(time && time.backGroundImageUrl) || 'http://img1.sc115.com/uploads/sc/jpg/151/14856.jpg'})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'round',
        color: 'white'
      }

      const footer = <Footer activeNavTab='TIME' />
      const timeList = time.timeList
      const height = window.innerHeight - 55
      const addComponent = isGuess ? null : (
        <label htmlFor="addTimeIcon">
          <i className="material-icons">add</i>
          <select
            id="addTimeIcon"
            className="dropdown"
            onChange={this.addNewTime}
          >
            <option style={({display:'none'})} value="">请选择</option>
            <option value="addTime">添加心情</option>
            <option value="addMatch">晒约球</option>
          </select>
        </label>
      )
      content = (
        <div>
          <div className={style.Timelist} style={({height:height, overflow: 'auto', clear: 'both'})}>
            <InfiniteScroll
              className='clearfix'
              pageStart={this.state.pageStart}
              loadMore={this.debounceFuc}
              hasMore={this.state.hasMore}
              useWindow={false}
              threshold={200}
              loader={<div className={style.loader}>正在加载...</div>}
            >
              <div className={style.BackGroundImage} style={bgstyle}>
                <div className={style.add}>
                  {addComponent}
                </div>
                <div className={style.name}>{user.name}</div>
                <div className={style['user-info']}>{user.gender === 'male' ? '男' : '女'} | {user.birthday}</div>
              </div>
              {(timeList.length === 0 && this.state.hasMore ===false) ? <p className={style.text}>您的朋友圈没有任何内容</p>
                : timeList.map((item, index) => {
                  return  <TimeItem isGuess={isGuess} key={index} Item={item} isLast={index === timeList.length -1} fetchDeleteTime={fetchDeleteTime} />
                }
              )}
              {(timeList.length !== 0 && this.state.hasMore ===false) ? <p className={style.text}>---我是有底线的---</p> : null}
            </InfiniteScroll>
            {footer}
          </div>
        </div>
      )
    }
    return <div style={{ height: '100%'}}>
      {content}
    </div>
  }
}
