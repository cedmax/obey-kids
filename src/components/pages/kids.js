import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Navigation from 'components/molecules/navigation';
import Kid from 'components/organisms/kid';

@inject('store')
@observer
export default class Kids extends Component {
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
      <div>
        {kidsComponents}
        <Navigation />
      </div>
    );
  }
}

Kids.propTypes = {
  store: PropTypes.shape({
    kids: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired
    })).isRequired,
    stars: PropTypes.arrayOf(PropTypes.objects)
  })
};