import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Kid from 'components/organisms/kid';

function mapKids(stars) {
  return (kid) => (
    <Kid 
      key={ kid.name }
      stars={ stars[kid.name] }
      name={ kid.name } />
  );
}

@inject('store')
@observer
export default class KidsEvaluation extends Component {
  render() {
    const {
      kids,
      stars
    } = this.props.store;

    const kidsComponents = kids.map(mapKids(stars));
    return (
      <div>{kidsComponents}</div>
    );
  }
}

KidsEvaluation.propTypes = {
  store: PropTypes.shape({
    kids: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired
    })).isRequired,
    stars: PropTypes.arrayOf(PropTypes.objects)
  })
};