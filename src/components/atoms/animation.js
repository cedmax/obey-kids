import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import constants from 'store/constants'

export default class StarAnimation extends Component {
  render () {
    const {
      direction,
      total,
      current
    } = this.props

    const itWentUp = (current === total) && (direction === constants.ACTION_UP)
    const itWentDown = (current - 1 === total) && (direction === constants.ACTION_DOWN)

    const className = cx({
      'animated': itWentDown || itWentUp,
      'headShake': itWentDown,
      'tada': itWentUp
    })

    return (
      <div className={className}>
        {this.props.children}
      </div>
    )
  }
}

StarAnimation.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.string,
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired
}
