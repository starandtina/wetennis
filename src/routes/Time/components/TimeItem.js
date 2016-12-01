import React, { Component } from 'react';
import ScoreItem from "components/ScoreItem";

import cs from "./MatchList.scss";

import style from './TimeItem.scss';

class TimeItem extends Component {
  deleteItem = () => {
    const { Item, fetchDeleteTime } = this.props;
    fetchDeleteTime({
      id: Item.id
    })
  };
  render() {
    const { Item, isLast, isGuess } = this.props;
    const { date, TimesPics: imgs, message, permission, id } = Item;
    let PermissionIcon = <i className="material-icons">public</i>;
    if (Number(permission) == 1) {
      PermissionIcon = <i className="material-icons">person</i>;
    } else if (Number(permission) == 2) {
      PermissionIcon = <i className="material-icons">lock</i>;
    }
    if (Item.type === "Message") {
      const imgContent = imgs.length > 0 ?
        imgs.map((img, index) => <div key={id+'_'+index} className={style.ImgMsg}>
          <img src={img.timesImgStr}/>
        </div>)
        : null;
      return (
        <div>
          <div className={style.TipLine}>
            <div className={style.Left}>{date && date.substring(0,10)}</div>
            <div className={style.Right}>
              <span className={style.Circle}></span>
              发表了心情
              <span className={style.IconGroup}>
                {PermissionIcon}
                {isGuess ? null : <i className="material-icons" onClick={this.deleteItem}>cancel</i>}
              </span>
            </div>
          </div>
          <div>
            <div className={`${style.Left} ${style.Border}`}></div>
            <div className={style.Right}></div>
          </div>
          <div className={style.content}>
            <p>{message}</p>
            {imgs.length > 0 ? imgContent : null}
          </div>
          {isLast ? null : (<div>
            <div className={`${style.Left} ${style.Border}`}></div>
            <div className={style.Right}></div>
          </div>)}
        </div>
      )
    }
    const {
      matchDate,
      location,
      us,
      ourScore,
      opponent,
      opponentScore
      } = Item;
    const win =  ourScore > opponentScore;
    const imgContent = imgs.length > 0 ?
      imgs.map((img, index) => <div key={id+'_'+index} className={style.ImgMsg}>
        <img src={img.timesImgStr}/>
      </div>)
      : null;
    return (
      <div>
        <div className={style.TipLine}>
          <div className={style.Left}>{date && date.substring(0,10)}</div>
          <div className={style.Right}>
            <span className={style.Circle}></span>
            约球
            <span className={style.IconGroup}>
              {PermissionIcon}
              {isGuess ? null : <i className="material-icons" onClick={this.deleteItem}>cancel</i>}
            </span>
          </div>
        </div>
        <div>
          <div className={`${style.Left} ${style.Border}`}></div>
          <div className={style.Right}></div>
        </div>
        <div className={style.content}>
          <div className={cs.groupItem}>
            <div className={cs.groupInfo}>
              <div className={cs.matches}>{location}</div>
              {matchDate}
            </div>
            <ScoreItem
              key={1}
              user={({username: us})}
              doubles={false}
            >
              <div className={`${cs.teamItem} ${cs.score}`}>
                {ourScore}
              </div>
              <div className={`${cs.teamItem} ${win ? cs.win : cs.lose}`}>
                <i className="material-icons">done</i>
              </div>
            </ScoreItem>
            <ScoreItem
              key={2}
              user={({username: opponent})}
              doubles={false}
            >
              <div className={`${cs.teamItem} ${cs.score}`}>
                {opponentScore}
              </div>
              <div className={`${cs.teamItem} ${win ? cs.lose : cs.win}`}>
                <i className="material-icons">done</i>
              </div>
            </ScoreItem>
          </div>
          <p className={style.MatchMessage}>{message}</p>
          {imgs.length > 0 ? imgContent : null}
        </div>
        {isLast ? null : (<div>
          <div className={`${style.Left} ${style.Border}`}></div>
          <div className={style.Right}></div>
        </div>)}
      </div>
    )
  }
}

export default TimeItem;