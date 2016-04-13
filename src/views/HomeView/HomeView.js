/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { increment, doubleAsync } from '../../redux/modules/counter'
import { fetchLatestNews } from '../../redux/modules/latestNews'
import classes from './HomeView.scss'

import Footer from 'components/Footer/Footer'

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
type Props = {
  counter: number,
  doubleAsync: Function,
  increment: Function
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component<void, Props, void> {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchLatestNews()
  }

  render () {
    var latestNewsNode = this.props.latestNews.map(function(p) {
      return (
        <div key='{p.id}'>
          {p.email}:  {p.name.title} {p.name.first} {p.name.middle}
        </div>
      )
    });

    return (
      <div className='container text-center wetennis'>
        <header className='wetennis-header'>…</header>
        <div className="wetennis-body">
          {latestNewsNode}
        </div>
       <footer className='wetennis-footer'>
        <Footer currentTab='LATEST' />
       </footer>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter,
  latestNews: state.latestNews
})
export default connect((mapStateToProps), {
  increment: () => increment(1),
  doubleAsync,
  fetchLatestNews
})(HomeView)
