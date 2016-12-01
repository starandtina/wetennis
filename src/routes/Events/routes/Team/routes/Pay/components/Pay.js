import React, { PureComponent } from 'react'

import { Accordion, Panel } from 'react-bootstrap'

import NavBack from 'components/NavBack'
import style from './Pay.scss'

import { buildUrl } from 'utils'
import { WETENNIS_URL } from 'utils/url'

export default class Pay extends PureComponent {
  pay = () => {
    const { location: {query}, params: {eventId} } = this.props

    window.location.replace(
      buildUrl(query.payUrl, { redirectUrl: `${WETENNIS_URL}/events/${eventId}`})
    )
  }

  render() {
    const { location: {query}, group = {name:''}, registeredTeams = [], params: {eventId}, push } = this.props

    return (
      <div className={`${style.container} u-has-nav`}>
        <NavBack routes={this.props.routes} caption='团体报名' handleGoBack={() => push(`/events/${eventId}/team/register`)}>
        </NavBack>
        <p className={`${style['group-name']}`}>{group.name}</p>
        <div className={`${style['price-info']} text-center`}>
          <p className={style['price-tip']}>报名费用</p>
          <h1 className={style.price}>¥{query.price}</h1>
        </div>
        <Accordion defaultActiveKey="1">
          <Panel header="支付方式" eventKey="1">
            <div className={'clearfix ' + style.pay}>
              <div className='pull-left'>微信支付</div>
              <div className={'pull-right ' + style.green}><i className="material-icons">check_circle</i></div>
            </div>
          </Panel>
        </Accordion>
        <div className={`${style['button-container']}`}>
          <button className={`btn btn-primary btn-lg btn-block`} onClick={this.pay}>确认支付</button>
        </div>
        <p className={`${style['registered-team-header']}`}>已报名{registeredTeams.length > 0 && <span>{`(${registeredTeams.length})`}</span>}</p>
        {registeredTeams.map( t => {
          return <div key={t.name} className={`${style['registered-team']} clearfix`}>
            <div className='pull-left'>{t.name}</div>
            <div className='pull-right'>{t.registerDate}</div>
          </div>
        })}
      </div>
    )
  }
}
