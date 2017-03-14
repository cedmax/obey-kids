import React, { Component, PropTypes } from 'react';
import SVGInline from 'react-svg-inline';
import normal from 'svg/normal-star.svg';
import better from 'svg/better-star.svg';
import boom from 'svg/boom-star.svg';
import cx from 'classnames';
import style from 'styles/star.scss';
import constants from 'store/constants';

const stars = {
  normal,
  better,
  boom
};

export default class Star extends Component {
  render() {
    const {
      selected,
      active,
      type,
      onClick,
      animation
    } = this.props;

    const star = stars[type];
    const className = cx(style.star, {
      [style.active]: active,
      [style.selected]: selected,
      'animated': !!animation,
      'headShake': (animation === constants.ACTION_DOWN),
      'tada': (animation === constants.ACTION_UP)
    });

    return (
      <div className={ className }>
        <SVGInline onClick={ onClick } svg={ star } />
      </div>
    );
  }
}

Star.propTypes = {
  active: PropTypes.bool.isRequired,
  animation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]).isRequired,
  selected: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onClick: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.bool
  ])
};