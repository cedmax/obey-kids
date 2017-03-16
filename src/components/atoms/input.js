import React, { PropTypes } from 'react'
import style from 'styles/input.scss'

export default function Input (props) {
  return (
    <input className={style.input} onChange={props.onChange} value={props.value} type='text' />
  )
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}
