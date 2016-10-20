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
    const { fetchMyData, user: { user: { id } } } = this.props;

    fetchMyData({
      userId: id,
    });
  }

  render () {
    const { children, user } = this.props;
    const userInfo = user.userInfo;
    const equipments = userInfo && userInfo.equipment ?
    userInfo.equipment.map(equip => (<div className={style.equip} key={equip.id}>
      <Link to={`/dashboard/me/editEqu/${equip.id}`}>
        <img src={equip.imgUrl} alt=""/>
      </Link>
    </div>))
      : null;
    const bgstyle = {
      backgroundColor: 'lightgray',
      backgroundImage:  `url(${userInfo && userInfo.backGroundImageUrl})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'round',
      color: 'white',
    };
    //let content = (<div>Dashboard<button onClick={this.props.logoutUser.bind(this)}>LOGOUT</button></div>);
    let content = userInfo ? (<div className='u-hasNav'>
      <NavBack caption='个人中心' hiddenBack={true} transparent>
        <Link className={style.Icon} to="/dashboard/me/editBG"><i className="material-icons">collections</i></Link>
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
        <Link to="/dashboard/myMatch" className={`${style.Item} ${style.Green}`}>
          <div className={style.Num}>{userInfo.gamesNum}</div>
          <div className={style.Des}>我的比赛</div>
        </Link>
        <div className={`${style.Item} ${style.Green}`}>
          <div className={style.Num}>{userInfo.guessNum}</div>
          <div className={style.Des}>我的竞猜</div>
        </div>
      </div>
      <div>
        {equipments}
        <div className={`${style.equip} ${style.Add}`}>
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
    return (
      <div>
        {content}
      </div>
    )
  }
}

export default Dashboard
