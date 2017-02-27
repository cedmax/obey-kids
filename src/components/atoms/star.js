import React, { Component, PropTypes } from 'react';
import SVGInline from 'react-svg-inline';
import cx from 'classnames';
import normal from 'svg/normal-star.svg';
import better from 'svg/better-star.svg';
import boom from 'svg/boom-star.svg';
import style from 'styles/star.scss';
import Beep from 'components/atoms/beep';

const stars = {
  normal,
  better,
  boom
};

export default class Star extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selected && !nextProps.selected) {
      this.setState({
        direction: 'down'
      });
    } else if (!this.props.selected && nextProps.selected) {
      this.setState({
        direction: 'up'
      });
    } else {
      this.setState({
        direction: null
      });
    }
  }

  render () {
    const {
      selected,
      active,
      type,
      onClick
    } = this.props;

    const star = stars[type];
    const className = cx(style.star, {
      [style.active]: active,
      [style.selected]: selected,
      'animated': !!this.state.direction,
      'headShake': (this.state.direction === 'down'),
      'tada': (this.state.direction === 'up')
    });

    let soundElm;
    if (this.state.direction) {
      soundElm = <Beep direction={this.state.direction} />;
    }
    return (
      <div className={ className }>
        <SVGInline onClick={ onClick } svg={ star } /> 
        {soundElm}
      </div>
    );
  }
}

Star.propTypes = {
  active: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onClick: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.bool
  ])
};