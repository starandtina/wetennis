/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { activeNavTab } from '../../redux/modules/activeNavTab'

import Footer from 'components/Footer/Footer'

type Props = {
  activeNavTab: string,
  actions: Object
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class EventView extends React.Component<void, Props, void> {
  static propTypes = {
    activeNavTab: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className='container text-center wetennis'>
        <header className='wetennis-header'>…</header>
        <div className="wetennis-body">
          <h1>EVENT VIEW</h1>
        </div>
       <footer className='wetennis-footer'>
        <Footer {...this.props} />
       </footer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  activeNavTab: state.activeNavTab
})
export default connect((mapStateToProps), {
  activeNavTab
})(EventView)
