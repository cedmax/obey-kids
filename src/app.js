import React, { Component } from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import Login from 'components/pages/login';
import AddKids from 'components/pages/add-kids';
import KidsEvaluation from 'components/pages/kids-evaluation';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class App extends Component {
  constructor(props) {
    super(props);

    this.validateIndex = this.validateIndex.bind(this);
    this.validateAddKids = this.validateAddKids.bind(this);
    this.validateKids = this.validateKids.bind(this);
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/">
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