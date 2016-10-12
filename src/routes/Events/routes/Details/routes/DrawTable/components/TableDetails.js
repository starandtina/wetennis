import React from "react";
import {Link} from "react-router";

import ScoreItem from "components/ScoreItem";
import cs from "./TableDetails.scss";

export default ({data, eventId}) => {
  return (
    <div className={cs.container}>
    {data.map((item, index) => {
      return (
        <div key={index} className={cs.breakItem}>
          {item.map((item, index) => {
            let winTeam;
            let doubles = false;
            for (let i = 0, l = item.length; i < l; i++) {
              let v = item[i];
              if (!doubles && Array.isArray(v.users) && v.users.length > 1) {
                doubles = true;
              }
              if (v.win) {
                winTeam = v;
                break;
              }
            }
            return (
              <div key={index} className={cs.littleItem}>
                <div className={`${cs.littleItemLeft} ${winTeam ? cs.hasWinner : ""}`}>
                  {item.map((item, index) => {
                    return (
                      <div key={index}>
                        {item.matchId
                        ? <Link className={cs.matchLink} to={`/events/${eventId}/match/${item.matchId}`}>
                            <ScoreItem
                              user={item.users}
                              doubles={doubles}
                            >
                              <span className={cs.score}>{item.score}</span>
                              <span className={`material-icons ${item.win ? cs.win : cs.lose}`}>done</span>
                            </ScoreItem>
                          </Link>
                        : <ScoreItem
                            user={item.users}
                            doubles={doubles}
                          >
                            <span className={cs.score}>{item.score}</span>
                            <span className={`material-icons ${item.win ? cs.win : cs.lose}`}>done</span>
                          </ScoreItem>}
                      </div>
                    );
                  })}
                </div>
                <div className={cs.littleItemRight}>
                  {winTeam
                  ? <Link　className={cs.matchLink} key={index} to={`/events/${eventId}/match/${item.matchId}`}>
                      <ScoreItem
                        className={cs.winTeam}
                        user={winTeam.users}
                        doubles={doubles}
                      ></ScoreItem>
                    </Link>
                  : <ScoreItem
                      className={cs.winTeam}
                      user={false}
                      doubles={doubles}
                    ></ScoreItem>}
                </div>
              </div>
            );
          })}
        </div>
      );
      
    })}
    </div>
  );
}
