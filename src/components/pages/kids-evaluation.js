import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Kid from 'components/organisms/kid';

function mapKids(kid) {
  return (
    <Kid 
      key={ kid.name }
      kid={ kid } />
  );
}

@inject('store')
@observer
export default class KidsEvaluation extends Component {
  render() {
    const {
      kids
    } = this.props.store;

    const kidsComponents = kids.map(mapKids);
    return (
      <div>{kidsComponents}</div>
    );
  }
}

KidsEvaluation.propTypes = {
  store: PropTypes.shape({
    kids: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired
    })).isRequired
  })
};