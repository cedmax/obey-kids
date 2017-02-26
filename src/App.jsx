import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Kid from 'components/organisms/kid';
import Login from 'components/pages/login';
import AddKids from 'components/pages/add-kids';
import KidsEvaluation from 'components/pages/kids-evaluation';

function mapKids(kid) {
  return (
    <Kid 
      key={ kid.name }
      kid={ kid } />
  );
}

@observer
export default class App extends Component {
  render() {
    const {
      kids,
      user,
      onLogin, 
      addKid
    } = this.props.appState;
    
    if (!user) {
      return (
        <Login onLogin={onLogin} />
      );
    } 

    if (!kids) {
      return (
        <AddKids addKid={addKid} />
      );
    }
    
    return (
      <KidsEvaluation kids={kids} />
    );
  }
}