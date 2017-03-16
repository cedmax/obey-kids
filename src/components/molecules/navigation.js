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
      next, 
      showGraph,
      graphMode,
      hideGraph
    } = this.props.view;

    let mainNav;
    if (!graphMode) {
      const formattedDate = getDates.pretty(day);
      mainNav = (
        <div>
          <div className={ style.arrow }>
            <SVGInline onClick={ this.movePrev } svg={ prevIcon } />
          </div>
          <span className={ graphMode ? style.disabled : null }>{ formattedDate }</span>
          <div className={ `${style.arrow} ${next ? '' : style.disabled}` }>
            <SVGInline onClick={ next ? this.moveNext : null } svg={ nextIcon } />
          </div>
        </div>
      );
    }

    return (
      <div className={ style.block }>
        {mainNav}
        <div className={ style.graph }>
          <a onClick={ graphMode ? hideGraph : showGraph }><SVGInline svg={ graphIcon } /> Show Graphs</a>
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
    next: PropTypes.bool,
    graphMode: PropTypes.bool,
    showGraph: PropTypes.func,
    hideGraph: PropTypes.func
  })
};