import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import FacebookLogin from 'react-facebook-login';
import style from 'styles/login.scss';

@inject('store')
@observer
export default class Login extends Component {
  render() {
    return (
      <div 
        className={style.block}>
        <FacebookLogin
          appId="753642171478775"
          fields="name"
          callback={this.login.bind(this)}
        />
      </div>
    );
  }

  login(user) {
    this.props.store.onLogin(user);
    browserHistory.push('/add-kids');
  }
}

Login.propTypes = {
  store: PropTypes.shape({
    onLogin: PropTypes.func.isRequired
  })
};