import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'

import { cls } from 'utils'
import cs from './News.scss'

export default class News extends Component {
  onClickLike() {
    const {
      item,
      likeNews
    } = this.props

    likeNews && likeNews(item)
  }

  render() {
    const { item } = this.props

    return (
      <div className={cs.news}>
        <Link to={`/news/${item.id}`} key={item.id}>
          <p><img src={item.thumbImgUrl} className='img-responsive center-block' /></p>
          <h4 className={cls`text-center ${cs.h4}`}>{item.title}</h4>
        </Link>
        <Grid className={cs.text}>
          <Row className='u-verticalCenterWithFlex'>
            <Col xs={7}>
              <div className={cls`pull-left ${cs.marginRight5}`}>
                <img src={item.providerIconUrl} className={cls`img-responsive ${cs['provider-icon']}`} />
              </div>
              <div className='pull-left'>
                <div>{item.provider}</div>
                <div className='text-muted'>{item.date}</div>
              </div>
            </Col>
            <Col xs={5}>
              <div className='pull-right'>
                <span className={cs['icon-container']}><i className={cls`material-icons highlight ${cs.marginRight5} ${cs.icon}`}>comment</i>{item.commentCount}</span>
                <span className={cs['icon-container']}><i onClick={this.onClickLike.bind(this)} className={cls`material-icons highlight ${cs.marginRight5} ${cs.icon}`}>favorite</i>{item.likeCount}</span>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
