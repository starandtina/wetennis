import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import InfiniteScroll from 'react-infinite-scroller'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import Footer from 'components/Footer'
import style from './TimeContainer.scss';

import { fetchMyTimes, fetchTimesInfo } from '../actions';
const myData = {
  "id": "sha32dsjk23",
    "name": "my real name",
    "username": "pacific0437",
    "password": "88888888",
    "phone": "18629032103",
    "gender": "male",
    "cardId": "232323198611111111"
}
const mapStateToProps = (state) => ({
  user: state.user || myData,
  time: state.time
});

const mapDispatchToProps = ({
  fetchMyTimes, fetchTimesInfo, push
})

class Times extends Component {
  componentDidMount(){
    const { fetchMyTimes, fetchTimesInfo, user } = this.props;
    fetchTimesInfo({
      id: user.id
    });
    fetchMyTimes({
      id: user.id,
      currentPage: 1
    });
    console.log('componentDidMount');
  }

  handleRefresh = (downOrUp, callback) => {
    console.log('handleRefresh');
    let { time: { lastPage } } = this.props;
    if (downOrUp === 'up' && !lastPage) { // 加载更多
      this.loadData(downOrUp, callback);
    }
  }

  loadData = (downOrUp, callback) => {
    const { fetchMyTimes, time: { currentPage } } = this.props;
    fetchMyTimes();
    //callApi({url}).then(
    //  ({json, response}) => {
    //    //这里为了展示效果，延长1秒
    //    setTimeout(() => {
    //      const {list} = this.state;
    //      this.setState({
    //        list: downOrUp === 'up' ? union(list, json.data.list) : json.data.list
    //      });
    //      if (callback && typeof callback === 'function') {
    //        callback();
    //      }
    //    }, 1000);
    //  },
    //  (error) => {
    //    if (callback && typeof callback === 'function') {
    //      callback();
    //    }
    //  });
  }

  render() {
    const { time, children } = this.props;
    let content = null;
    let footer =  null;
    const myprops = {
      maxAmplitude: 80,
      debounceTime: 30,
      throttleTime: 100,
      deceleration: 0.001,
      refreshCallback: this.handleRefresh,
      loadMoreCallback: this.loadData,
      hasMore: time.lastPage
    };
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
      const height = window.innerHeight - 50 -280;
      content = (
        <div>
          <div className={style.BackGroundImage} style={bgstyle}>
            <div className={style.Name}>{time.name}</div>
            <div className={style.UserInfo}>{time.gender} | {time.birthday} | {time.Constellation}</div>
          </div>
          <div className={style.Timelist} style={({height:height})}>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadData}
              hasMore={true}
              loader={<div className="loader">Loading ...</div>}
            >
              {timeList.map((item, index) => {
                  return  <li key={index}>{item.id}</li>
                }
              )}
            </InfiniteScroll>
          </div>
          {footer}
        </div>
      )
    }
    return (
      <div style={{ height: '100%', paddingBottom: '56px', marginBottom: '56px' }}>
        {content}
      </div>
    )
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Times)