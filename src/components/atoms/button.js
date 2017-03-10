import React, { PropTypes } from 'react';

export default function Button(props) {
  return (
    <button
      className={ props.className }
      onClick={ props.onClick }
    >
      {props.text}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};