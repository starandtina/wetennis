import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import { cls } from 'utils'
import cs from './News.scss'

export default class News extends Component {
  render() {
    const { item } = this.props

    return (
      <div className={cs.news}>
        <p><img src={item.thumbImgUrl} className={cls`img-responsive ${cs.img}`} /></p>
        <h4 className='text-center'>{item.title}</h4>
        <Grid className={cs.text}>
          <Row className='u-verticalCenterWithFlex'>
            <Col xs={7}>
              <div className={cls`pull-left ${cs.marginRight5}`}><img src={item.providerIconUrl} className='img-responsive' /></div>
              <div className='pull-left'>
                <div>{item.provider}</div>
                <div className='text-muted'>{item.date}</div>
              </div>
            </Col>
            <Col xs={5}>
              <div className='pull-right'>
                <span className={cs['icon-container']}><i className={cls`material-icons highlight ${cs.marginRight5} ${cs.icon}`}>comment</i>{item.commentCount}</span>
                <span className={cs['icon-container']}><i className={cls`material-icons highlight${cs.marginRight5} ${cs.icon}`}>favorite</i>{item.likeCount}</span>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
