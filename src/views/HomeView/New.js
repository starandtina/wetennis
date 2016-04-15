import React from 'react'
import classes from './New.scss'

export default class New extends React.Component {
   render () {
    const n = this.props.data;

    return (
      <div className='new'>
        <img className={`${classes['img']} img-responsive`} src={n.IMGURL} alt={n.TITLE} />
        <h5>{n.TITLE}</h5>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-6 u-paddingRight0'>
              <div className='row'>
                <div className='col-xs-2'>
                  icon
                </div>
                <div className='col-xs-10'>
                  <p className='text-left'>{n.WRITER}</p>
                  <p className={`text-left text-muted ${classes['issueTime']}`}>{n.ISSUETIME}</p>
                </div>
              </div>
            </div>
            <div className='col-xs-6 u-paddingLeft0'>
              <div className='grid'>
                <span className={`${classes['icon-container']} grid-cell`}><i className="fa fa-commenting">&nbsp;999</i></span>
                <span className={`${classes['icon-container']} grid-cell`}><i className="fa fa-heart">&nbsp;999</i></span>
                <span className={`${classes['icon-container']} grid-cell`}><i className="fa fa-plus">&nbsp;已关注</i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
