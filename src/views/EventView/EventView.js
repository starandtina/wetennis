/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { increment, doubleAsync } from '../../redux/modules/counter'

import Footer from 'components/Footer/Footer'

type Props = {
  counter: number,
  doubleAsync: Function,
  increment: Function
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class EventView extends React.Component<void, Props, void> {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className='container text-center wetennis'>
        <header className='wetennis-header'>…</header>
        <div className="wetennis-body">
          <h1>EVENT VIEW</h1>
        </div>
       <footer className='wetennis-footer'>
        <Footer currentTab='EVENT' />
       </footer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})
export default connect((mapStateToProps), {
  increment: () => increment(1),
  doubleAsync
})(EventView)
