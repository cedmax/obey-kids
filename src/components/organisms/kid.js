import React, { PropTypes } from 'react';
import Evaluation from 'components/molecules/evaluation';
import stringToDigit from 'helpers/string-to-digit';
import style from 'styles/kid.scss';

export default function Kid(props) {
  const {
    kid
  } = props;

  const iconSrc = stringToDigit(kid.name);

  return (
    <div className={ style.body }>
      <h1 className={ style.title }>
        <img 
          className={ style.icon } 
          src={ `assets/svg/icons/${iconSrc}.svg` } /> 
          
          { kid.name } <span>({ kid.stars })</span>
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