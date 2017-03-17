import React, { Component, PropTypes } from 'react'
import SVGInline from 'react-svg-inline'
import normal from 'svg/normal-star.svg'
import better from 'svg/better-star.svg'
import boom from 'svg/boom-star.svg'
import cx from 'classnames'
import style from 'styles/star.scss'

const stars = {
  normal,
  better,
  boom
}

export default class Star extends Component {
  render () {
    const {
      selected,
      type,
      onClick
    } = this.props

    const star = stars[type]
    const className = cx(style.star, {
      [style.active]: !!onClick,
      [style.selected]: selected
    })

    return (
      <div className={className}>
        <SVGInline onClick={onClick} svg={star} />
      </div>
    )
  }
}

Star.propTypes = {
  selected: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onClick: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.bool
  ])
}
