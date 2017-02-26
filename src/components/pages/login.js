import React, { PropTypes } from 'react';
import FacebookLogin from 'react-facebook-login';
import style from 'styles/login.scss';

export default function Login(props) {
  return (
    <div 
      className={style.block}>
      <FacebookLogin
        appId="753642171478775"
        fields="name"
        callback={props.onLogin}
      />
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};