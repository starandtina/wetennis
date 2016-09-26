import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import InfiniteScroll from 'react-infinite-scroller'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';

import Footer from 'components/Footer'
import style from './TimeContainer.scss';
import TimeItem from '../components/TimeItem';
import { fetchTimesList, fetchTimeInfo, fetchDeleteTime } from '../actions';

const mapStateToProps = (state) => ({
  user: state.user,
  time: state.time
});

const mapDispatchToProps = ({
  fetchTimesList, fetchTimeInfo, push, fetchDeleteTime
})

class Times extends Component {
  componentDidMount(){
    const { fetchTimesList, fetchTimeInfo, user: { user } } = this.props;
    //console.log(user);
    //debugger;
    // fetchTimeInfo({
    //   id: user.id
    // });
    fetchTimesList({
      id: user.id,
      currentPage: 1
    }).then(action => {
      this.setState({
        pageStart:0,
        hasMore: !action.payload.data.lastPage
      })
    });
  }
  state = {
    pageStart: -1
  }

  addNewTime = event => {
    const value = event.target.value;
    const { push } = this.props;
    push(`/time/${value}`);
  }

  loadData = () => {
    const { fetchTimesList, time: { currentPage }, user } = this.props;
    fetchTimesList({
      currentPage: currentPage + 1,
      userId: user.id
    }).then(action => {
      this.setState({
        pageStart:this.pageStart + 1,
        hasMore: !action.payload.data.lastPage
      })
    });
  }

  debounceFuc = this.loadData

  render() {
    const { time, children, fetchDeleteTime } = this.props;
    let content = null;
    let footer =  null;
    if (children) {
      content = children;
      footer =  null;
    } else {
      const bgstyle = {
        backgroundColor: 'lightgray',
        backgroundImage:  `url(${time && time.backGroundImageUrl})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'round',
        color: 'white'
      };
      const footer = <Footer activeNavTab='TIME' />;
      const timeList = time.timeList;
      const height = window.innerHeight - 55;
      content = (
        <div>
          <div className={style.Timelist} style={({height:height, overflow: 'auto', clear: 'both'})}>
            <InfiniteScroll
              className={style.loader}
              pageStart={this.state.pageStart}
              loadMore={this.debounceFuc}
              hasMore={this.state.hasMore}
              useWindow={false}
              threshold={200}
              loader={<div className={style.loader}>正在加载...</div>}
            >
              <div className={style.BackGroundImage} style={bgstyle}>
                <div className={style.add}>
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
                </div>
                <div className={style.Name}>{time.name}</div>
                <div className={style.UserInfo}>{time.gender} | {time.birthday} | {time.Constellation}</div>
              </div>
              {(timeList.length === 0 && this.state.hasMore ===false) ? <p className={style.text}>您的朋友圈没有任何内容</p>
                : timeList.map((item, index) => {
                  return  <TimeItem key={index} Item={item} isLast={index === timeList.length -1} fetchDeleteTime={fetchDeleteTime} />
                }
              )}
              {(timeList.length !== 0 && this.state.hasMore ===false) ? <p className={style.text}>已经到最后</p> : null}
            </InfiniteScroll>
            {footer}
          </div>
        </div>
      )
    }
    return (
      <div style={{ height: '100%'}}>
        {content}
      </div>
    )
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Times)
