import React, { Component, PropTypes } from 'react';
import Input from 'components/atoms/input';
import Button from 'components/atoms/button';
import style from 'styles/kid.scss';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';

@inject('store')
@observer
export default class AddKid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      names: ['']
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.moreKids = this.moreKids.bind(this);
  }

  render() {
    return (
      <div className={style.block}>
        <h1 className={style.title}>Add Kids</h1>
        { this.state.names.map((name, i) => {
          return (
            <div key={i}>
              <Input onChange={this.onChange(i)} value={name} /> 
              <Button className={style.add} onClick={this.moreKids} text="add" />
            </div>
          );
        }) }
        
        <div className={style.confirm}>
          <Button className={style.confirmButton} onClick={this.onSubmit} text="Confirm" />
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
    names.forEach((name) => this.props.store.addKid(name, 3));
    browserHistory.push('/kids');
  }
}

AddKid.propTypes = {
  store: PropTypes.shape({
    addKid: PropTypes.func.isRequired
  })
};