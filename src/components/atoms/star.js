import React, { Component, PropTypes } from 'react';
import SVGInline from 'react-svg-inline';
import { observer, inject } from 'mobx-react';
import Beep from 'components/atoms/beep';
import autobind from 'autobind-decorator';
import normal from 'svg/normal-star.svg';
import better from 'svg/better-star.svg';
import boom from 'svg/boom-star.svg';
import cx from 'classnames';
import style from 'styles/star.scss';

const stars = {
  normal,
  better,
  boom
};

@inject('store')
@observer
@autobind
export default class Star extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: props.store.day,
      direction: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.day === nextProps.store.day) {
      if (this.props.selected && !nextProps.selected) {
        this.setState({
          day: nextProps.store.day,
          direction: 'down'
        });
      } else if (!this.props.selected && nextProps.selected) {
        this.setState({
          day: nextProps.store.day,
          direction: 'up'
        });
      } else {
        this.resetState(nextProps.store.day);
      }
    } else {
      this.resetState(nextProps.store.day);
    }
  }

  render() {
    const {
      selected,
      active,
      type,
      onClick
    } = this.props;

    const star = stars[type];
    const className = cx(style.star, {
      [style.active]: active,
      [style.selected]: selected,
      'animated': !!this.state.direction,
      'headShake': (this.state.direction === 'down'),
      'tada': (this.state.direction === 'up')
    });

    let soundElm;
    if (this.state.direction) {
      soundElm = <Beep direction={ this.state.direction } />;
    }
    return (
      <div className={ className }>
        <SVGInline onClick={ onClick } svg={ star } />
        {soundElm}
      </div>
    );
  }

  resetState(day) {
    this.setState({
      day,
      direction: null
    });
  }
}

Star.propTypes = {
  active: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onClick: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.bool
  ]),
  store: PropTypes.shape({
    day: PropTypes.string.isRequired
  })
};