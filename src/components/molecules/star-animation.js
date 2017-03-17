import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import constants from 'store/constants'

export default class StarAnimation extends Component {
  render () {
    const {
      direction,
      starCount,
      index
    } = this.props

    const isGoingUp = (index === starCount - 1) && (direction === constants.ACTION_UP)
    const isGoingDown = (index === starCount) && (direction === constants.ACTION_DOWN)

    const className = cx({
      'animated': isGoingDown || isGoingUp,
      'headShake': isGoingDown,
      'tada': isGoingUp
    })

    return (
      <div className={className}>
        {this.props.children}
      </div>
    )
  }
}

StarAnimation.propTypes = {
  direction: PropTypes.string,
  starCount: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
}
