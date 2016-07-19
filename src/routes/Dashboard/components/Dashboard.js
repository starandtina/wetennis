import React from 'react'
import NavBack from 'components/NavBack'
import Footer from 'components/Footer'
import style from './Dashboard.scss';

export class Dashboard extends React.Component {
  props: Props;

  componentWillReceiveProps(nextProps) {
    // if (!this.props.user.user || (this.props.user.user && !nextProps.user.user)) {
    //   this.props.actions.push('/dashboard/signup')
    // }
  }

  componentDidMount () {
    const { fetchMyData , dispatch} = this.props;
    dispatch(fetchMyData());
  }

  render () {
    const { children, user } = this.props
    console.log(children);
    const userInfo = user.userInfo;
    console.log(userInfo);
    const equipments = userInfo && userInfo.equipment ?
    userInfo.equipment.map(equip => (<div className={style.equip} key={equip.id}><img src={equip.imgUrl} alt=""/></div>))
      : null;
console.log(userInfo && userInfo.backGroundImageUrl);
    const bgstyle = {
      backgroundImage:  `url(${userInfo && userInfo.backGroundImageUrl})`
    };
    //let content = (<div>Dashboard<button onClick={this.props.logoutUser.bind(this)}>LOGOUT</button></div>);
    let content = userInfo ? (<div>
      <NavBack caption='个人中心'>
        <i className="material-icons">&#xE0D8;</i>
        <i className="material-icons">settings</i>
      </NavBack>
      <div className={style.BackGroundImage} style={bgstyle}>
        <div className={style.Name}>{userInfo.name}</div>
        <div className={style.UserInfo}>{userInfo.gender}|{userInfo.birthday}|{userInfo.Constellation}</div>
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

    let footer = (<div></div>)

    if (children) {
      content = children
    }
    else {
      footer = <Footer activeNavTab='DASHBOARD' />
    }
    return (
      <div style={{ height: '100%', marginTop: '55px', paddingBottom: '55px' }}>
        {content}
        {footer}
      </div>
    )
  }
}

export default Dashboard
