/* @flow */
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchLatestNews } from 'redux/modules/latestNews'
import { setActiveNavTab } from 'redux/modules/activeNavTab'
import classes from './HomeView.scss'

import Footer from 'components/Footer/Footer'

import NewList from './NewList'

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
type Props = {
  activeNavTab: string,
  actions: Object
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component<void, Props, void> {
  static propTypes = {
    activeNavTab: PropTypes.number.isRequired,
    latestNews: PropTypes.func.isRequired,
    actions: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.actions.fetchLatestNews()
  }

  render () {debugger
    return (
      <div className='text-center wetennis'>
        <header className='wetennis-header'>…</header>
        <div className="wetennis-body">
          <h2>WeTennis</h2>
          <NewList data={this.props.latestNews} />
        </div>
       <footer className='wetennis-footer'>
        <Footer {...this.props} />
       </footer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  latestNews: state.latestNews,
  activeNavTab: state.activeNavTab
})

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators({ setActiveNavTab, fetchLatestNews }, dispatch)
})

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
