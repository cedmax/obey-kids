import React, { Component, PropTypes } from 'react';
import style from 'styles/navigation.scss';
import getDates from 'helpers/get-dates';
import autobind from 'autobind-decorator';
import { observer, inject } from 'mobx-react';
import SVGInline from 'react-svg-inline';
import router from 'helpers/router';
import prevIcon from 'svg/prev.svg';
import graphIcon from 'svg/graph.svg';
import nextIcon from 'svg/next.svg';

@inject('view')
@observer
@autobind
export default class Navigation extends Component {
  render() {
    const {
      day,
      next
    } = this.props.view;

    const formattedDate = getDates.pretty(day);
    return (
      <div className={ style.block }>
        <div className={ style.arrow }>
          <SVGInline onClick={ this.movePrev } svg={ prevIcon } />
        </div>
        { formattedDate }
        <div className={ `${style.arrow} ${next ? '' : style.disabled}` }>
          <SVGInline onClick={ next ? this.moveNext : null } svg={ nextIcon } />
        </div>
        <div className={ style.graph }>
          <a><SVGInline onClick={ this.moveNext } svg={ graphIcon } /> show graph</a>
        </div>
      </div>
    );
  }

  movePrev() {
    router.navigateToKids(getDates.prev(this.props.view.day));
  }

  moveNext() {
    router.navigateToKids(getDates.next(this.props.view.day));
  }
}

Navigation.propTypes = {
  view: PropTypes.shape({
    day: PropTypes.string,
    next: PropTypes.bool
  })
};