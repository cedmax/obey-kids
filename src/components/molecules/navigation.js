import React, { Component, PropTypes } from 'react';
import style from 'styles/navigation.scss';
import getDates from 'helpers/get-dates';
import autobind from 'autobind-decorator';
import { observer, inject } from 'mobx-react';
import SVGInline from 'react-svg-inline';
import router from 'helpers/router';
import prevIcon from 'svg/prev.svg';
import nextIcon from 'svg/next.svg';

@inject('store')
@observer
@autobind
export default class Navigation extends Component {
  render() {
    const {
      day,
      next
    } = this.props.store;

    const formattedDate = getDates.pretty(day);
    return (
      <div className={ style.block }>
        <div className={ style.arrow }>
          <SVGInline onClick={ this.movePrev } svg={ prevIcon } />
        </div>
        { formattedDate }
        <div className={ style.arrow } style={{ visibility: next ? 'visible':'hidden'}}>
          <SVGInline onClick={ this.moveNext } svg={ nextIcon } />
        </div>
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
    next: PropTypes.bool.isRequired
  })
};