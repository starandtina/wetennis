import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { registerEvent } from '../../../modules/register';
import { Accordion, Panel } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import style from './Purchase.scss';

import { buildUrl } from 'utils'
import { WETENNIS_URL } from 'utils/url'

const mapStateToProps = (state) => ({
  user: state.register.user,
  group: state.register.group,
  item: state.register.item,
  partnerId: state.partner && state.partner.partner && state.partner.partner.id,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ push, registerEvent }, dispatch);

class Purchase extends Component {
  register = () => {
    const { item, user, registerEvent, partnerId, params: { eventId }, push } = this.props;
    const redirectUrl = `${WETENNIS_URL}/events/${eventId}`

    registerEvent({
      itemId: item.id,
      ...user,
      partnerId
    }).then(({ payload: { data, code } }) => {
      if (code !== 0) {
        return
      }

      if (parseFloat(item.price) === 0 || !data.payUrl) {
        location.replace(redirectUrl)
      } else {
        location.replace(
          buildUrl(data.payUrl, { redirectUrl })
        )
      }
    })
  }

  render() {
    const { item, user, registerEvent } = this.props;

    return (
      <div className={style.Root}>
        <div className={style.PriceInfo}>
          <p className={style.PriceTip}>报名费用</p>
          <p className={style.Price}>¥{item.price}</p>
        </div>
        <Accordion defaultActiveKey="1">
          <Panel header="支付方式" eventKey="1">
            <div className={'clearfix ' + style.Pay}>
              <div className='pull-left'>微信支付</div>
              <div className={'pull-right ' + style.Green}><i className="material-icons">check_circle</i></div>
            </div>
          </Panel>
        </Accordion>
        <div className={style.ButtonGroup}>
          <button
              className={style.Button}
              onClick={this.register}
          >
            确认支付
          </button>
        </div>
      </div>
    )
  }
}


// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Purchase)
