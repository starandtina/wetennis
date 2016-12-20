import React, {Component} from "react";
import cs from './Infomation.scss';
import NavBack from "components/NavBack";

export default class Infomation extends Component {
  componentDidMount() {
    const {getInfomation, params:{eventId}} = this.props;
    getInfomation(eventId);
  }
  render() {
    const {data} = this.props;
    return (
      <div className={cs['container']}>
        <NavBack routes={this.props.routes} title=" " transparent />
        <div className={cs['info']}>
          <div className={cs['thumb']}>
            <img src={data.thumb} alt="" />
          </div>
          <div className={cs['infoText']}>
            <div className={cs['name']}>{data.name}</div>
            <div className={cs['type']}>{data.type}</div>
          </div>
        </div>
        <h3 className={cs['title']}>比赛项目</h3>
        <div className={cs['content']} dangerouslySetInnerHTML={{__html: data.programme}}></div>
        <h3 className={cs['title']}>主办单位</h3>
        <div className={cs['content']} dangerouslySetInnerHTML={{__html: data.hostUnit}}></div>
        <h3 className={cs['title']}>协办单位</h3>
        <div className={cs['content']} dangerouslySetInnerHTML={{__html: data.coOrganizer}}></div>
        <h3 className={cs['title']}>比赛时间和地点</h3>
        <div className={`${cs['content']} ${cs['locationAndDate']}`}>
          <div><i className={`material-icons ${cs.icons}`}>place</i>{data.location}</div>
          <div><i className={`material-icons ${cs.icons}`}>access_time</i>{`${data.startDate} - ${data.endDate}`}</div>
        </div>
        <h3 className={cs['title']}>比赛项目</h3>
        <div className={cs['content']} dangerouslySetInnerHTML={{__html: data.programme}}></div>
        <h3 className={cs['title']}>参赛资格</h3>
        <div className={cs['content']} dangerouslySetInnerHTML={{__html: data.qualification}}></div>
        <h3 className={cs['title']}>报名办法</h3>
        <div className={cs['content']} dangerouslySetInnerHTML={{__html: data.registration}}></div>
        <h3 className={cs['title']}>比赛办法</h3>
        <div className={cs['content']} dangerouslySetInnerHTML={{__html: data.competitiveWays}}></div>
        <h3 className={cs['title']}>奖励办法</h3>
        <div className={cs['content']} dangerouslySetInnerHTML={{__html: data.reward}}></div>
      </div>
    );
  }
}