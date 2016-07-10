import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { Accordion, Panel } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import style from './Purchase.scss';

const mapStateToProps = (state) => {
  console.log(state);
  return ({
  user: state.register.user,
  group: state.register.group,
  item: state.register.item,
  parnterId: state.register.parnterId
})}

const mapDispatchToProps = (dispatch) => bindActionCreators({ push }, dispatch);

class Purchase extends Component {
  render() {
    const { item } = this.props;
    console.log(item);

    return (
      <div className={style.Root}>
        <div className={style.PriceInfo}>
          <p className={style.PriceTip}>报名费用</p>
          <p className={style.Price}>{item.price}</p>
        </div>
        <Accordion defaultActiveKey="1">
          <Panel header="支付方式" eventKey="1">
            <div className='clearfix'>
              <div className='pull-left'>微信支付</div>
              <div className='pull-right'></div>
            </div>
          </Panel>
        </Accordion>
        <div className={style.ButtonGroup}>
          <button className={style.Button}>
            确认支付
          </button>
        </div>
      </div>
    )
  }
}


// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Purchase)