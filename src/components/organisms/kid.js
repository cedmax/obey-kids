import React, { PropTypes } from 'react';
import Evaluation from 'components/molecules/evaluation';
import style from 'styles/kid.scss';

export default function Kid(props) {
  const {
    kid
  } = props;

  return (
    <div className={ style.block }>
      <h1 className={ style.title }>
        { kid.name } ({ kid.stars })
      </h1>
      <Evaluation 
        name={ kid.name }
        stars={ kid.stars } />
    </div>
  );
}

Kid.propTypes = {
  kid: PropTypes.shape({
    name: PropTypes.string.isRequired,
    stars: PropTypes.number.isRequired
  })
};