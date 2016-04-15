import React from 'react'

import New from './New'

export default class NewList extends React.Component {
   render () {
    const newNodes = this.props.data.map(function(n) {
      return (
        <New data={n} key={n.ID} />
      );
    });

    return (
      <div className="newsList">
        {newNodes}
      </div>
    );
  }
}
