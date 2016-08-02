import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { registerEvent } from '../../../modules/register';
import { Accordion, Panel } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import style from './Purchase.scss';

const mapStateToProps = (state) => {
  console.log(state);
  return ({
  user: state.user.user,
  group: state.register.group,
  item: state.register.item,
  partnerId: state.register.partnerId
})}

const mapDispatchToProps = (dispatch) => bindActionCreators({ push, registerEvent }, dispatch);

class Purchase extends Component {

  register = () => {
    const { item, user, registerEvent, partnerId } = this.props;
    registerEvent({
      itemId: item.id,
      id: user.id,
      gender: user.gender,
      name: user.name,
      phone: user.phone,
      personCard: user.cardId,
      partnerId
    }).then(action => {
      console.log(action);
      location.replace(action.payload.data.payUrl);
    })
  };

  render() {
    const { item, user, registerEvent } = this.props;
    console.log(item);
    console.log(user);
    console.log(registerEvent);

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
