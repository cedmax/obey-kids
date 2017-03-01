import React, { PropTypes } from 'react';
import Star from 'components/atoms/star';
import style from 'styles/evaluation.scss';

const stars = ['normal', 'better', 'boom'];

function mapStars(starCount, add, remove) {
  return (star, i) => {
    const isSelected = (i < starCount);
    const isActive = (i === starCount || i === starCount - 1);
    const onClick = isSelected ? remove : add;

    return (
      <Star 
        onClick={ isActive && onClick }
        key={ star } 
        type={ star } 
        selected={ isSelected }
        active={ isActive } />
    );
  };
}

export default function Evaluation(props) {
  const starsComponents = stars.map(mapStars(props.stars, props.addStar, props.removeStar));

  return (
    <div className={ style.block }>
      {starsComponents}
    </div>
  );
}

Evaluation.propTypes = {
  stars: PropTypes.number.isRequired,
  addStar: PropTypes.func.isRequired,
  removeStar: PropTypes.func.isRequired
};