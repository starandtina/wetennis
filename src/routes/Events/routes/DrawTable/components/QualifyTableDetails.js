import React from "react";
import ScoreItem from "components/ScoreItem";
import cs from "./QualifyTableDetails.scss";
export default ({data}) => {
  return (
    <div className={cs.box}>
      {data.map((item, index) => {
        const complete = item.complete;
        return (
          <div key={index} className={cs.groupItem}>
            <div className={cs.groupTitle}>{`第${index + 1}组`}</div>
            {item.games.map((item, index) => {
              return (
                <ScoreItem
                  key={index}
                  user={item.users}
                  doubles={false}
                >
                  <div className={cs.score}>
                    <span>{item.gameNumber}</span>
                    <div>场次</div>
                  </div>
                  <div className={cs.score}>
                    <span>{item.criticalSpot}</span>
                    <div>胜负场</div>
                  </div>
                  <div className={cs.score}>
                    <span>{item.criticalGame}</span>
                    <div>胜负局</div>
                  </div>
                  <div className={`${cs.complete} ${complete ? "" : cs.hide} ${index === 0 ? cs.winner : ""}`}>
                    <span>{index + 1}</span>
                  </div>
                </ScoreItem>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
