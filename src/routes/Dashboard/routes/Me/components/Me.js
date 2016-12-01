import React from 'react';
import { Link } from 'react-router';
import NavBack from 'components/NavBack'
import Footer from 'components/Footer'
import props from 'prop-deep';

import cs from './Me.scss'

export class Dashboard extends React.Component {

  componentWillReceiveProps(nextProps) {
     if (!this.props.user.user || (this.props.user.user && !nextProps.user.user)) {
       //this.props.push('/dashboard/signin')
     }
  }

  componentWillMount() {
    if (!this.props.user.user) {
      //this.props.push('/dashboard/signin')
    }
  }

  componentDidMount () {
    const { fetchMyData, user: { user: { id } } } = this.props;

    fetchMyData({
      userId: id,
    });
  }

  render () {
    const { children, user } = this.props;
    const userInfo = user.userInfo;
    const equipments = userInfo && userInfo.equipment ?
    userInfo.equipment.map(equip => (<div className={cs.equip} key={equip.id}>
      <Link to={`/dashboard/me/editEqu/${equip.id}`}>
        <img src={equip.imgUrl} alt=""/>
      </Link>
    </div>))
      : null;
    let content = userInfo ? (<div className={cs.container}>
      <NavBack routes={this.props.routes} caption='个人中心' hiddenBack={true} transparent>
        <Link className={cs.Icon} to="/dashboard/me/editBG"><i className="material-icons">collections</i></Link>
        <Link className={cs.Icon} to="/dashboard/settings"><i className="material-icons">settings</i></Link>
      </NavBack>
      <div className={cs.BackGroundImageContainer}>
        <img src={props('userInfo.backGroundImageUrl')(user)} className={cs.BackGroundImage} />
        <div className={cs.Information}>
          <div className={cs.Name}>{userInfo.name}</div>
          <div className={cs.UserInfo}>
            {userInfo.gender === 'male' ? '男' : '女'} | {userInfo.birthday} | {userInfo.Constellation}
          </div>
        </div>
      </div>
      <div className='clearfix'>
        <div className={cs.Item}>
          <div className={cs.Num}>{userInfo.friendsNum}</div>
          <div className={cs.Des}>我的朋友</div>
        </div>
        <div className={cs.Item}>
          <div className={cs.Num}>{userInfo.attentionsNum}</div>
          <div className={cs.Des}>我的关注</div>
        </div>
        <div className={cs.Item}>
          <div className={cs.Num}>{userInfo.score}</div>
          <div className={cs.Des}>社区积分</div>
        </div>
        <Link to="/dashboard/myMatch" className={`${cs.Item} ${cs.Green}`}>
          <div className={cs.Num}>{userInfo.gamesNum}</div>
          <div className={cs.Des}>我的比赛</div>
        </Link>
        <div className={`${cs.Item} ${cs.Green}`}>
          <div className={cs.Num}>{userInfo.guessNum}</div>
          <div className={cs.Des}>我的竞猜</div>
        </div>
      </div>
      <div className='clearfix'>
        {equipments}
        <div className={`${cs.equip} ${cs.Add}`}>
          <Link to="/dashboard/me/addEqu">
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
      <Footer activeNavTab='DASHBOARD' />
    </div>) : null;


    if (children) {
      content = children
    }
    return <div>
        {content}
      </div>
  }
}

export default Dashboard
