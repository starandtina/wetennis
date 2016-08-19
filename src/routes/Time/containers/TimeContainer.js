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
import { fetchTime, fetchTimeInfo } from '../actions';
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
  fetchTime, fetchTimeInfo, push
})

class Times extends Component {
  componentDidMount(){
    const { fetchTime, fetchTimeInfo, user } = this.props;
    fetchTimeInfo({
      id: user.id
    });
    fetchTime({
      id: user.id,
      currentPage: 1
    }).then(action => {
      console.log(action);
      this.setState({
        pageStart:0,
        hasMore: !action.payload.data.lastPage
      })
    });
    console.log('componentDidMount');
  }
  state = {
    pageStart: -1
  }
  //
  //handleRefresh = (downOrUp, callback) => {
  //  console.log('handleRefresh');
  //  let { time: { lastPage } } = this.props;
  //  if (downOrUp === 'up' && !lastPage) { // 加载更多
  //    this.loadData(downOrUp, callback);
  //  }
  //}

  loadData = (downOrUp, callback) => {
    const { fetchTime, time: { currentPage }, user } = this.props;
    fetchTime({
      currentPage: currentPage + 1,
      userId: user.id
    });
    console.log('loadData '+(currentPage+1));
  }

  debounceFuc = this.loadData

  render() {
    const { time, children } = this.props;
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
              loader={<div className={style.loader}>Loading ...</div>}
            >
              <div className={style.BackGroundImage} style={bgstyle}>
                <div className={style.add}>
                  <IconMenu
                    iconButtonElement={<IconButton><i className="material-icons">add</i></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  >
                    <Link to="/time/addMatch" ><MenuItem primaryText="addMatch" /></Link>
                    <Link to="/time/addTime"><MenuItem primaryText="addTime" /></Link>
                  </IconMenu>
                </div>
                <div className={style.Name}>{time.name}</div>
                <div className={style.UserInfo}>{time.gender} | {time.birthday} | {time.Constellation}</div>
              </div>
              {timeList.map((item, index) => {
                  return  <TimeItem key={index} Item={item} />
                }
              )}
            </InfiniteScroll>
            {footer}
          </div>
        </div>
      )
    }
    return (
      <div style={{ height: '100%', backgroundColor:'#1cca5a' }}>
        {content}
      </div>
    )
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Times)
