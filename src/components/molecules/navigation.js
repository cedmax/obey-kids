import React, { Component, PropTypes } from 'react';
import style from 'styles/navigation.scss';
import getDates from 'helpers/get-dates';
import autobind from 'autobind-decorator';
import { observer, inject } from 'mobx-react';
import router from 'helpers/router';

@inject('store')
@observer
@autobind
export default class Navigation extends Component {
  render() {
    const {
      day,
      direction: {
        prev, next
      }
    } = this.props.store;

    const formattedDate = getDates.pretty(day);
    return (
      <div className={ style.block }>
        <a onClick={ this.movePrev } style={{ visibility: prev ? 'visible':'hidden'}}> PREV </a>
        { formattedDate }
        <a onClick={ this.moveNext } style={{ visibility: next ? 'visible':'hidden'}}> NEXT </a>
      </div>
    );
  }

  movePrev() {
    router.navigateToKids(getDates.prev(this.props.store.day));
  }

  moveNext() {
    router.navigateToKids(getDates.next(this.props.store.day));
  }
}

Navigation.propTypes = {
  store: PropTypes.shape({
    day: PropTypes.string.isRequired,
    direction: PropTypes.shape({
      prev: PropTypes.bool.isRequired,
      next: PropTypes.bool.isRequired
    }).isRequired
  })
};