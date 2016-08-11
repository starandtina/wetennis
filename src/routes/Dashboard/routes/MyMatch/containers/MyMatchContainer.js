import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMyMatch, fetchMyPractice } from '../actions';
import style from './MyMatchContainer.scss'
import NavBack from 'components/NavBack'
import {Tabs, Tab} from 'material-ui/Tabs';
import MatchList from '../components/MatchList'
import PracticeList from '../components/PracticeList'

const mapStateToProps = (state) => ({
  MyMatch: state.MyMatch.matchData,
  MyPractice: state.MyMatch.practiceData,
  userId: state.user.user.id
})

const mapDispatchToProps = ({
  fetchMyMatch,
  fetchMyPractice
})

class MyMatch extends Component {
  componentDidMount() {
    const { fetchMyMatch, userId } = this.props;
    fetchMyMatch({
      userId
    });
  }
  render() {
    const { MyMatch, userId, fetchMyPractice, MyPractice } = this.props;
    const TabStyle = {
      backgroundColor: 'white',
      color: '#1cca5a'
    }
    const inkBarStyle = {
      backgroundColor: '#1cca5a'
    }

    return (
      <div>
        <NavBack caption='个人中心'>
        </NavBack>
        <Tabs inkBarStyle={inkBarStyle}>
          <Tab label="我的赛事" value={1} style={TabStyle}>
            <MatchList data={MyMatch}/>
          </Tab>
          <Tab label="我的约球" value={2} style={TabStyle}>
            <PracticeList
              fetchMyPractice={fetchMyPractice}
              userId={userId}
              data={MyPractice}
            />
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMatch)
