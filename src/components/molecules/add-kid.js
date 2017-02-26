import React, { Component, PropTypes } from 'react';
import Input from 'components/atoms/input';
import Button from 'components/atoms/button';

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
      <div>
        { this.state.names.map((name, i) => {
          return (
            <div key={i}><Input onChange={this.onChange(i)} value={name} /> <a onClick={this.moreKids}>add</a></div>
          );
        }) }
        
        <Button onClick={this.onSubmit} text="Add" />
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

  onSubmit(e) {
    const names = this.state.names;
    names.forEach(this.props.addKid);
  }
}

AddKid.propTypes = {
  addKid: PropTypes.func.isRequired
};