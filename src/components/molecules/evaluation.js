import React, { Component, PropTypes } from 'react'
import Star from 'components/atoms/star'
import style from 'styles/kid.scss'
import autobind from 'autobind-decorator'
import { addStar, removeStar } from 'store/actions'
import Beep from 'components/atoms/beep'
import Animation from 'components/atoms/animation'
import constants from 'store/constants'

const stars = ['normal', 'better', 'boom']

@autobind
export default class Evaluation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      direction: null
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.date !== this.props.date) {
      this.resetDirection()
    }
  }

  render () {
    const starsComponents = stars.map(this.mapStars(this.props.name, this.props.stars))

    return (
      <div className={style.wrapper}>
        {starsComponents}
        <Beep direction={this.state.direction} onEnd={this.resetDirection} />
      </div>
    )
  }

  resetDirection () {
    this.setState({
      direction: null
    })
  }

  onStarClick (name, callback, direction) {
    return () => {
      callback(name)
      this.setState({
        direction
      })
    }
  }

  mapStars (name, starCount) {
    return (star, i) => {
      const isSelected = (i < starCount)
      const isActive = (i === starCount || i === starCount - 1)
      const onClick = isSelected
        ? this.onStarClick(name, removeStar, constants.ACTION_DOWN)
        : this.onStarClick(name, addStar, constants.ACTION_UP)

      return (
        <Animation
          direction={this.state.direction}
          total={starCount}
          current={i + 1}
          key={star}
        >
          <Star
            onClick={isActive && onClick}
            type={star}
            selected={isSelected}
          />
        </Animation>
      )
    }
  }
}

Evaluation.propTypes = {
  name: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired
}
