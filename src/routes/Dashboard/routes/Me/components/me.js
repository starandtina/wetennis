import React from 'react';
import { Link } from 'react-router';
import NavBack from 'components/NavBack'
import Footer from 'components/Footer'
import style from './Me.scss';

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
    const { fetchMyData } = this.props;
    fetchMyData();
  }

  render () {
    const { children, user } = this.props;
    const userInfo = user.userInfo;
    const equipments = userInfo && userInfo.equipment ?
    userInfo.equipment.map(equip => (<div className={style.equip} key={equip.id}><img src={equip.imgUrl} alt=""/></div>))
      : null;
    const bgstyle = {
      backgroundColor: 'lightgray',
      backgroundImage:  `url(${userInfo && userInfo.backGroundImageUrl})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'round',
      color: 'white',
    };
    //let content = (<div>Dashboard<button onClick={this.props.logoutUser.bind(this)}>LOGOUT</button></div>);
    let content = userInfo ? (<div>
      <NavBack caption='个人中心'>
        <Link className={style.Icon} to="/dashboard/message"><i className="material-icons">&#xE0D8;</i></Link>
        <Link className={style.Icon} to="/dashboard/settings"><i className="material-icons">settings</i></Link>
      </NavBack>
      <div className={style.BackGroundImage} style={bgstyle}>
        <div className={style.Name}>{userInfo.name}</div>
        <div className={style.UserInfo}>{userInfo.gender} | {userInfo.birthday} | {userInfo.Constellation}</div>
      </div>
      <div>
        <div className={style.Item}>
          <div className={style.Num}>{userInfo.friendsNum}</div>
          <div className={style.Des}>我的朋友</div>
        </div>
        <div className={style.Item}>
          <div className={style.Num}>{userInfo.attentionsNum}</div>
          <div className={style.Des}>我的关注</div>
        </div>
        <div className={style.Item}>
          <div className={style.Num}>{userInfo.score}</div>
          <div className={style.Des}>社区积分</div>
        </div>
        <div className={`${style.Item} ${style.Green}`}>
          <div className={style.Num}>{userInfo.gamesNum}</div>
          <div className={style.Des}>我的比赛</div>
        </div>
        <div className={`${style.Item} ${style.Green}`}>
          <div className={style.Num}>{userInfo.guessNum}</div>
          <div className={style.Des}>我的竞猜</div>
        </div>
      </div>
      <div>
        {equipments}
      </div>
    </div>) : null;


    if (children) {
      content = children
    }
    return (
      <div>
        {content}
      </div>
    )
  }
}

export default Dashboard
