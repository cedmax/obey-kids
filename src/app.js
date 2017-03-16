import React, { Component, PropTypes } from 'react'
import { inject, PropTypes as MobXPropTypes } from 'mobx-react'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import autobind from 'autobind-decorator'
import Login from 'components/pages/login'
import AddKids from 'components/pages/add-kids'
import Kids from 'components/pages/kids'
import Template from 'components/pages/template'
import { setDay } from 'store/actions'

function getKids (kidsObj) {
  return Object.keys(kidsObj)
}

@inject((stores) => {
  const {
    view,
    user
  } = stores

  return {
    view,
    user
  }
})
@autobind
export default class App extends Component {
  render () {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Template}>
          <Route path='kids(/:date)' component={Kids} onEnter={this.validateKidsAndFetch} />
          <Route path='add-kids' component={AddKids} onEnter={this.validateAddKids} />
          <IndexRoute component={Login} onEnter={this.validateIndex} />
        </Route>
      </Router>
    )
  }

  validateIndex (state, replace) {
    if (this.props.user.identity) {
      replace('/add-kids')
    }
  }

  validateAddKids (state, replace) {
    const kids = getKids(this.props.view.kids)
    if (kids.length) {
      replace('/kids')
    }

    if (!this.props.user.identity) {
      replace('/')
    }
  }

  validateKidsAndFetch (state, replace) {
    if (!this.props.user.identity) {
      replace('/')
    }

    setDay(state.params.date)
  }
}

App.propTypes = {
  view: PropTypes.shape({
    kids: MobXPropTypes.observableObject
  }),
  user: PropTypes.shape({
    identity: MobXPropTypes.observableObject
  })
}
