import React, {Component} from "react";
import NavBack from "components/NavBack";
import RankingTabs from "./Tabs";
import cs from "./RankingDetails.scss";

export default class RankingDetails extends Component {
  state = {

  }
  componentDidMount() {
    const {getInfo, getSingleTab, getDoubleTab} = this.props;
    getInfo().then(({payload: {
      code, data
    }}) => {
      if (Number(code) === 0) {
        if (data["singleTabInfo"]) {
          
        }
        if (data["doubleTabInfo"]) {
          
        }
      }
    });
  }
  render() {
    const {info} = this.props;
    let usersex;
    if (info.usersex === 1) {
      usersex = "男";
    } else if (info.usersex === 2) {
      usersex = "女";
    }
    return (
      <div className={cs.box}>
        <NavBack title=" ">
          {info.like
          ? <i className="material-icons">favorite</i>
          : <i className="material-icons">favorite_border</i>}
        </NavBack>
        <div className={cs.banner}>
          <img src={info.userimage} className={cs.userimage} />
          <div className={cs.infoBox}>
            <div className={cs.left}>
              <div className={cs.username}>
                {info.username}
              </div>
              {`${usersex} | ${info.borthday} | ${info.constellation}`}
            </div>
            <div className={cs.right}>
              <div className={cs.sNum}>
                <div>
                  {info.singleNumber}
                  <div className={cs.numberType}>单打</div>
                </div>
              </div>
              <div className={cs.dNum}>
                <div>
                  {info.doubleNumber}
                  <div className={cs.numberType}>双打</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className={cs.detailInfo}>
          <li>{`单打积分：${info.singleAccumulatePoints}`}</li>
          <li>{`生日：${info.borthday}`}</li>
          <li>{`双打积分：${info.doubleAccumulatePoints}`}</li>
          <li>{`身高：${info.stature}`}</li>
          <li>{`用户名：${info.account}`}</li>
          <li>{`体重：${info.weight}`}</li>
          <li>{`网球元年：${info.year}`}</li>
          <li>{`正拍：${info.front}`}</li>
          <li>{`城市：${info.city}`}</li>
          <li>{`反拍：${info.back}`}</li>
        </ul>
        <RankingTabs />
      </div>
    );
  }
}
