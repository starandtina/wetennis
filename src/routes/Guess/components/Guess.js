import React, { Component } from "react";

import TopNav from "components/TopNav";
import Footer from "components/Footer";
import {Link} from "react-router";
import cs from "./Guess.scss";

export default class Guess extends Component {
  componentDidMount() {
    const { getGuessEvents } = this.props;
    getGuessEvents();
  }
  render() {
    const { guessEvents } = this.props;
    return (
      <div className={cs.box}>
        <TopNav title="竞猜赛事列表" />
        <div>
        {guessEvents.map((item, index) => {
          return (
            <Link
              to={`/guess/${item.id}`}
              key={index}
              className={cs.item}
            >
              <div className={cs.thumb}>
                <img src={item.thumb} />
              </div>
              <div className={cs.nameBox}>
                <div className={cs.name}>{item.name}</div>
                <div className={cs.smallText}>{item.date}</div>
              </div>
              {item.activity && item.activity > 0
              ? <div className={cs.activity}>
                  {item.activity}
                  <div className={cs.smallText}>Activity</div>
                </div>
              : undefined}
              <div className={cs.total}>
                {item.total}
                <div className={cs.smallText}>Activity</div>
              </div>
              <i className={`material-icons ${cs.icon}`}>keyboard_arrow_right</i>
            </Link>
          );
        })}
        </div>
        <Footer activeNavTab='GUESS' />
      </div>
    );
  }
}

