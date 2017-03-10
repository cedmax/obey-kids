import React, { PropTypes } from 'react';
import Star from 'components/atoms/star';
import style from 'styles/kid.scss';
import { addStar, removeStar } from 'store/actions';

const stars = ['normal', 'better', 'boom'];

function mapStars(name, starCount) {
  return (star, i) => {
    const isSelected = (i < starCount);
    const isActive = (i === starCount || i === starCount - 1);
    const onClick = isSelected ? removeStar(name) : addStar(name);

    return (
      <Star
        onClick={ isActive && onClick }
        key={ star }
        type={ star }
        selected={ isSelected }
        active={ isActive }
      />
    );
  };
}

export default function Evaluation(props) {
  const starsComponents = stars.map(mapStars(props.name, props.stars));

  return (
    <div className={ style.wrapper }>
      {starsComponents}
    </div>
  );
}

Evaluation.propTypes = {
  name: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired
};