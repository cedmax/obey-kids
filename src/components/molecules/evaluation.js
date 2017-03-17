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
      this.setState({
        direction: null
      })
    }
  }

  render () {
    const starsComponents = stars.map(this.mapStars(this.props.name, this.props.stars))

    let soundElm
    if (this.state.direction) {
      soundElm = <Beep direction={this.state.direction} onEnd={this.stopAudio} />
    }

    return (
      <div className={style.wrapper}>
        {starsComponents}
        {soundElm}
      </div>
    )
  }

  stopAudio () {
    this.setState({
      direction: null
    })
  }

  mapStars (name, starCount) {
    return (star, i) => {
      const isSelected = (i < starCount)
      const isActive = (i === starCount || i === starCount - 1)
      const onClick = isSelected ? () => {
        removeStar(name)
        this.setState({
          direction: constants.ACTION_DOWN
        })
      } : () => {
        addStar(name)
        this.setState({
          direction: constants.ACTION_UP
        })
      }

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
