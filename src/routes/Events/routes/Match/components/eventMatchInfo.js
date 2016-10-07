import React from 'react'
import cs from './eventMatchInfo.scss'

export const MatchInfo = ({data, sets}) => {
  return (
    <div className={cs.box}>
      <MatchInfoStatus data={data.status} />
      <MatchSetsFilter
        data={sets.sets}
        value={sets.currentSets}
        onChange={sets.changeSets}
      />
      <EventInfo data={data} />
      <MatchVS data={data.teams} gameTime={data.gameTime} />
      <MatchGames data={data.games} />
      <MatchScoreDetail data={data.scoreDetails} />
    </div>
  )
}

export const MatchVS = ({data, gameTime}) => {
  if (!data || !Array.isArray(data) || data.length !== 2) {
    return <div />;
  }
  const team1 = data[0];
  const team2 = data[1];
  return (
    <div className={cs.mathcVs}>
      <div className={cs.vsTeam1}>
        <MatchVSUsers data={team1.users} />
        {team1.win
        ? <i className="material-icons">done</i>
        : undefined}
      </div>
      <div className={cs.vsTeam2}>
        {team2.win
        ? <i className="material-icons">done</i>
        : undefined}
        <MatchVSUsers data={team2.users} />
      </div>
      <div className={cs.vsBox}>
        <div className={cs.vsScore}>
          {`${team1.score} : ${team2.score}`}
        </div>
        <div className={cs.vsGameTime}>{gameTime}</div>
        <div className={cs.vsBg}></div>
      </div>
    </div>
  );
};

export const MatchSetsFilter = ({data=[], value, onChange = ()=>{}}) => {
  const currentItem = data.find(function(item) {
    return item.value == value;
  });
  const text = currentItem ? currentItem.text : '';
  return (
    <div className={cs.setsFilter}>
      {text}
      <i className={`material-icons ${cs.setsFilterIcon}`}>keyboard_arrow_down</i>
      <select
        className="dropdown"
        onChange={onChange}
        value={value}
      >
        {data.map(function(item, index) {
          return (
            <option key={index} value={item.value}>{item.text}</option>
          );
        })}        
      </select>
    </div>
  );
}

export const MatchVSUsers = ({data}) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div />;
  }
  return (
    <div className={`${cs.vsUser} ${cs["vsUser" + data.length]}`}>
      <div className={cs.vsUserimageBox}>
        {data.map((item, index) => {
          return (
            <img key={index} className={cs.vsUserimage} src={item.userimage} alt="" />
          );
        })}
      </div>
      {data.map((item, index) => {
        return (
          <span className={cs.vsUsername} key={index}>{item.username}</span>
        );
      })}
    </div>
  );
};

const gamesTitle = ['第一局', '第二局', '第三局', '第四局', '第五局']
export const MatchGames = ({data}) => {
  return (
    <div className={cs.games}>
      <div className={cs.gamesTitle}>
      {gamesTitle.map((item, index) => {
        return (
          <div className={cs.scoreItem} key={index}>{item}</div>
        )
      })}
      </div>
      <div className={cs.gamesScore}>
        <i className={cs.team1}></i>
      {data.map((item, index) => {
        let score, win
        if (item) {
          score = item[0].score
          win = item[0].win
        }
        return (
          <div className={`${cs.scoreItem} ${win ? cs.win : cs.lose}`} key={index}>{score}</div>
        )
      })}
      </div>
      <div className={cs.gamesScore}>
        <i className={cs.team2}></i>
      {data.map((item, index) => {
        let score, win
        if (item) {
          score = item[1].score
          win = item[1].win
        }
        return (
          <div className={`${cs.scoreItem} ${win ? cs.win : cs.lose}`} key={index}>{score}</div>
        )
      })}
      </div>
    </div>
  )
}

export const MatchScoreDetail = ({data}) => {
  return (
    <div className={cs.scoreDetails}>
    {data.map((item, index) => {
      return (
        <div className={cs.scoreDetailsItem} key={index}>
          {item.map((item, index) => {
            return (
              <div className={cs.scoreInfo} key={index}>
                <div className={cs.scoreNumber}>{item.score}</div>
                <div className={cs.scoreFirst}>
                  {item.first
                  ? <i className="material-icons">fiber_manual_record</i>
                  : undefined}
                </div>
                {item.details.map((v, k) => {
                  return (
                    <div className={v.win ? cs.win : cs.lose} key={k}>{v.score}</div>
                  );
                })}
              </div>
            );
          })}
        </div>
      );
    })}
    </div>
  );
};

export const MatchInfoStatus = ({data}) => {
  let str
  switch (data) {
    case 1:
      str = '比赛即将开始'
      break
    case 2:
      str = '比赛已经开始'
      break
    case 3:
      str = '比赛已经结束'
      break
  }
  return (
    <div className={cs[`status${data}`]}>{str}</div>
  )
}

export const EventInfo = ({data}) => {
  return (
    <div className={cs.eventInfo}>
      <div className={cs.eventName}>{data.eventName}</div>
      <div className={cs.matchName}>{data.matchName}</div>
      <div className={cs.gameTime}><i className={`material-icons ${cs.icons}`}>access_time</i>{data.gameTime}</div>
      <div className={cs.location}><i className={`material-icons ${cs.icons}`}>place</i>{data.location}</div>
      <div className={cs.vs}></div>
    </div>
  )
}

export default MatchInfo
