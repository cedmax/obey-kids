import React, { Component, PropTypes } from 'react';
import { inject, PropTypes as MobXPropTypes } from 'mobx-react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import autobind from 'autobind-decorator';
import Login from 'components/pages/login';
import AddKids from 'components/pages/add-kids';
import KidsEvaluation from 'components/pages/kids-evaluation';
import Template from 'components/pages/template';

@inject('store')
@autobind
export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Template}>
          <Route path="kids" component={KidsEvaluation} onEnter={this.validateKids} />
          <Route path="add-kids" component={AddKids} onEnter={this.validateAddKids} />
          <IndexRoute component={Login} onEnter={this.validateIndex}/>
        </Route>
      </Router>
    );
  }

  validateIndex(state, replace) {
    if (this.props.store.user) {
      replace('/add-kids');
    }
  }

  validateAddKids(state, replace) {
    if (this.props.store.kids.length) {
      replace('/kids');
    }

    if (!this.props.store.user) {
      replace('/');
    }
  }

  validateKids(state, replace) {
    if (!this.props.store.kids.length) {
      replace('/add-kids');
    }

    if (!this.props.store.user) {
      replace('/');
    }
  }
}

App.propTypes = {
  store: PropTypes.shape({
    kids: MobXPropTypes.observableArrayOf(PropTypes.object),
    user: MobXPropTypes.observableObject
  })
};