import React, { PropTypes } from 'react';
import Evaluation from 'components/molecules/evaluation';
import stringToDigit from 'helpers/string-to-digit';
import style from 'styles/kid.scss';

export default function Kid(props) {
  const {
    name,
    stars,
    date
  } = props;

  const iconSrc = stringToDigit(name);

  return (
    <div className={ style.body }>
      <h1 className={ style.title }>
        <img
          className={ style.icon }
          src={ `/assets/svg/icons/${iconSrc}.svg` }
        />

        { name }<span> ({ stars })</span>
      </h1>
      <Evaluation
        date={ date }
        name={ name }
        stars={ stars }
      />
    </div>
  );
}

Kid.propTypes = {
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired
};