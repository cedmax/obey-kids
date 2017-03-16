import React, { Component, PropTypes } from 'react'
import Button from 'components/atoms/button'
import style from 'styles/login.scss'
import { login } from 'services/auth'

export default class Login extends Component {
  render () {
    return (
      <div
        className={style.block}
      >
        <Button
          text='Login with Facebook'
          className={style.button}
          onClick={login}
        />
      </div>
    )
  }
}

Login.propTypes = {
  store: PropTypes.shape({
    onLogin: PropTypes.func.isRequired
  })
}
