import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Kid from 'components/organisms/kid';

@inject('store')
@observer
export default class KidsEvaluation extends Component {
  render() {
    const {
      kids
    } = this.props.store;

    const kidsComponents = Object.keys(kids).map((kidName) => (
      <Kid
        key={ kidName }
        stars={ kids[kidName] }
        name={ kidName }
      />
    ));
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