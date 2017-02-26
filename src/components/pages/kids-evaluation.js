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
export default class KidsEvaluation extends Component {
  render() {
    const {
      kids
    } = this.props;
    
    const kidsComponents = kids.map(mapKids);
    return (
      <div>{kidsComponents}</div>
    );
  }
}

KidsEvaluation.propTypes = {
  kids: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  })).isRequired
};