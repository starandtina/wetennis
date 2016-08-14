import React from "react";
import cs from "./eventMatchTechnicalStatistics.scss";

const MatchTechnicalStatistics = ({data}) => {
  return (
      <ul className={cs.technicalList}>
        {data.map((item, index) => {
          const percent = item.title.indexOf("率") !== -1;
          const total = item.team1 + item.team2;
          const leftPercent = Math.floor(item.team1 / total * 100);
          const rightPercent = Math.floor(item.team2 / total * 100);
          return (
            <li key={index}>
              <div className={cs.technicalText}>
                {percent ? `${item.team1}/${total} (${leftPercent})%` : item.team1}
                <div className={cs.technicalTitle}>{item.title}</div>
                {percent ? `${item.team2}/${total} (${rightPercent})%` : item.team2}
              </div>
              <div className={cs.technicalBar}>
                <div style={{width: `${leftPercent}%`}} className={cs.technicalTeam1Bar}></div>
                <div style={{width: `${rightPercent}%`}} className={cs.technicalTeam2Bar}></div>
              </div>
            </li>
          );
        })}
      </ul>
  );
}

export default MatchTechnicalStatistics;

