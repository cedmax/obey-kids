import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import autobind from 'autobind-decorator';
import Input from 'components/atoms/input';
import Button from 'components/atoms/button';
import style from 'styles/kid.scss';
import { addKid } from 'store/actions';

@autobind
export default class AddKid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      names: ['']
    };
  }

  render() {
    return (
      <div className={ style.block }>
        <h1 className={ style.title }>Add Kids</h1>
        { this.state.names.map((name, i) => {
          return (
            <div key={ name }>
              <Input onChange={ this.onChange(i) } value={ name } />
              <Button className={ style.add } onClick={ this.moreKids } text="add" />
            </div>
          );
        }) }

        <div className={ style.confirm }>
          <Button className={ style.confirmButton } onClick={ this.onSubmit } text="Confirm" />
        </div>
      </div>
    );
  }

  moreKids() {
    const names = this.state.names;
    names.push('');
    this.setState({
      name
    });
  }

  onChange(i) {
    return (e) => {
      const name = e.target.value;
      const names = this.state.names;
      names[i] = name;
      this.setState({
        names
      });
    };
  }

  onSubmit() {
    const names = this.state.names;
    names.forEach((name) => addKid(name, 3));
    browserHistory.push('/kids');
  }
}