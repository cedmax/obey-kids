import React, { PropTypes } from 'react';
import Star from 'components/atoms/star';
import style from 'styles/evaluation.scss';

const stars = ['normal', 'better', 'boom'];

function onClick(props, isSelected) {
  return () => {
    isSelected ? props.removeStar() : props.addStar();
  };
}

function mapStars(props) {
  return (star, i) => {
    const isSelected = (i < props.stars);
    const isActive = (i === props.stars || i === props.stars - 1);
    
    return (
      <Star 
        onClick={ isActive && onClick(props, isSelected)}
        key={ star } 
        type={ star } 
        selected={ isSelected }
        active={ isActive } />
    );
  };
}

export default function Evaluation(props) {
  const starsComponents = stars.map(mapStars(props));

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