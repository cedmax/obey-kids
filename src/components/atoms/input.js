import React, { PropTypes } from 'react';

export default function Input(props) {
  return (
    <input onChange={props.onChange} value={props.value} type="text" />
  );
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};