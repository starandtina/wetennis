import React from "react";
import cs from "./eventMatchGuess.scss";
import {Link} from "react-router";

const MatchGuess = ({data}) => {
  const {key, score} = data;
  return (
    <div className={cs.box}>
      <div className={cs.title}>净胜局</div>
      <div className={cs.key}>
        <div className={cs.keyTeam}>
          <div className={cs.keyTeam1}>{key.team1.name}</div>
          <div className={cs.keyVs}>vs</div>
          <div className={cs.keyTeam2}>{key.team2.name}</div>
        </div>
        <div className={cs.keyInfo}>
          <div className={cs.keyTeam1Info}>
            {key.team1.percent}
            <span className={key.team1.risk ? cs.lowRisk : cs.highRisk}>
            {key.team1.risk
            ? <i className="material-icons">arrow_drop_down</i>
            : <i className="material-icons">arrow_drop_up</i>}
            {key.team1.ratio}
            </span>
          </div>
          <div className={cs.keyTeam2Info}>
            <span className={key.team2.risk ? cs.lowRisk : cs.highRisk}>
            {key.team2.risk
            ? <i className="material-icons">arrow_drop_down</i>
            : <i className="material-icons">arrow_drop_up</i>}
            {key.team2.ratio}
            </span>
            {key.team2.percent}
          </div>
        </div>
        <div className={cs.keyBar}>
          <div className={cs.keyBarTeam1} style={{width: key.team1.percent}}></div>
          <div className={cs.keyBarTeam2} style={{width: key.team2.percent}}></div>
        </div>
      </div>
      <div className={cs.title}>比分</div>
      <div className={cs.score}>
        {score.map((item, index) => {
          return (
            <Link className={cs.scoreItem} key={index} to={`/guess/betting/${item.id}`}>
              <div className={cs.scoreInfoBox}>
                <div className={cs.scoreInfo}>
                  <div className={cs.scoreNumber}>{item.score}</div>
                  <div>
                    <span className={item.risk ? cs.lowRisk : cs.highRisk}>
                      {item.risk
                      ? <i className="material-icons">arrow_drop_down</i>
                      : <i className="material-icons">arrow_drop_up</i>}
                      {item.ratio}
                    </span>
                    {item.percent}
                  </div>
                </div>
                <div className={cs.scoreBar}>
                  <span className={cs.scoreBarPercent} style={{width: item.percent}}></span>
                </div>
              </div>
              <div className={cs.moreIcon}>
                <i className="material-icons">keyboard_arrow_right</i>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}


export default MatchGuess;
