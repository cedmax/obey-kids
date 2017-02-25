import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import Kid from 'components/organisms/kid';

function mapKids(kid) {
  return (
    <Kid 
      key={ kid.name }
      kid={ kid } />
  );
}

@observer
export default class App extends Component {
  render() {
    const {
      kids
    } = this.props;
    const kidsComponents = kids.map(mapKids);
    
    return (
      <div>
        { kidsComponents }
      </div>
    );
  }
}