import React, { Component } from 'react';
import ScoreItem from "components/ScoreItem";

import cs from "./MatchList.scss";

import style from './TimeItem.scss';

class TimeItem extends Component {
  render() {
    const { Item } = this.props;
    if (Item.type === "Message") {
      const { date, imgs, message, permission, id } = Item;
      const imgContent = imgs.length > 0 ?
        imgs.map((img, index) => <div key={id+'_'+index} className={style.ImgMsg}>
          <img src={img}/>
        </div>)
        : null;
      return (
        <div>
          <div className={style.TipLine}>
            <div className={style.Left}>{date}</div>
            <div className={style.Right}>
              <span className={style.Circle}></span>
              发表了心情
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
          <div>
            <div className={`${style.Left} ${style.Border}`}></div>
            <div className={style.Right}></div>
          </div>
        </div>
      )
    }
    const {
      date,
      imgs,
      message,
      permission,
      id,
      matchDate,
      location,
      match,
      us,
      myScore,
      opponent,
      opponentScore
      } = Item;

    const win =  myScore > opponentScore;
    const imgContent = imgs.length > 0 ?
      imgs.map((img, index) => <div key={id+'_'+index} className={style.ImgMsg}>
        <img src={img}/>
      </div>)
      : null;
    return (
      <div>
        <div className={style.TipLine}>
          <div className={style.Left}>{date}</div>
          <div className={style.Right}>
            <span className={style.Circle}></span>
            约球
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
                {myScore}
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
        <div>
          <div className={`${style.Left} ${style.Border}`}></div>
          <div className={style.Right}></div>
        </div>
      </div>
    )
  }
}

export default TimeItem;