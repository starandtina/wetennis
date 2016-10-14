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
import style from './UserTime.scss';
import TimeItem from '../../../components/TimeItem';
import { fetchTimesList, fetchTimeInfo, fetchDeleteTime, clearTime } from '../../../actions';

const mapStateToProps = (state) => ({
  user: state.user,
  time: state.time
});

const mapDispatchToProps = ({
  fetchTimesList, fetchTimeInfo, push, fetchDeleteTime, clearTime
})

class Times extends Component {
  componentDidMount(){
    const { fetchTimesList, fetchTimeInfo, params, clearTime, user: { user } } = this.props;
    console.log(params);
    console.log(user);
    //debugger;
    // fetchTimeInfo({
    //   id: user.id
    // });
    clearTime();
    fetchTimesList({
      id: params.userId,
      currentPage: 1,
      needLoading: true
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
    const { user: { user } } = this.props;
    const value = event.target.value;
    const { push } = this.props;
    push(`/time/users/${user.id}/${value}`);
  }

  loadData = () => {
    const { fetchTimesList, params, time: { currentPage }, user: { user } } = this.props;
    fetchTimesList({
      currentPage: currentPage + 1,
      id: params.userId,
    }).then(action => {
      this.setState({
        pageStart:this.pageStart + 1,
        hasMore: !action.payload.data.lastPage
      })
    });
  }

  debounceFuc = this.loadData

  render() {
    const { time, children, fetchDeleteTime, params, user: { user } } = this.props;
    let content = null;
    let footer =  null;
    const isGuess = !(params.userId === user.id);
    console.log(params.userId, user.id);
    if (children) {
      content = children;
      footer =  null;
    } else {
      const bgstyle = {
        backgroundColor: 'lightgray',
        backgroundImage:  `url(${(time && time.backGroundImageUrl) || 'http://img1.sc115.com/uploads/sc/jpg/151/14856.jpg'})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'round',
        color: 'white'
      };

      const footer = <Footer activeNavTab='TIME' />;
      const timeList = time.timeList;
      const height = window.innerHeight - 55;
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
                  {addComponent}
                </div>
                <div className={style.Name}>{time.name}</div>
                <div className={style.UserInfo}>{time.gender} | {time.birthday} | {time.Constellation}</div>
              </div>
              {(timeList.length === 0 && this.state.hasMore ===false) ? <p className={style.text}>您的朋友圈没有任何内容</p>
                : timeList.map((item, index) => {
                  return  <TimeItem isGuess={isGuess} key={index} Item={item} isLast={index === timeList.length -1} fetchDeleteTime={fetchDeleteTime} />
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
