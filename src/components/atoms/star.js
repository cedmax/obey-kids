import React, { PropTypes } from 'react';
import SVGInline from 'react-svg-inline';
import cx from 'classnames';
import normal from 'svg/normal-star.svg';
import better from 'svg/better-star.svg';
import boom from 'svg/boom-star.svg';
import style from 'styles/star.scss';

const stars = {
  normal,
  better,
  boom
};

export default function Star(props) {
  const {
    selected,
    active,
    type,
    onClick
  } = props;

  const star = stars[type];
  const className = cx(style.star, {
    [style.active]: active,
    [style.selected]: selected
  });

  return (
    <SVGInline onClick={onClick} className={ className } svg={ star } />
  );
}

Star.propTypes = {
  active: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func
};