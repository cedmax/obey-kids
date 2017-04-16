import React, { Component, PropTypes } from 'react'
import { observer, inject } from 'mobx-react'
import Navigation from 'components/molecules/navigation'
import Kid from 'components/organisms/kid'

@inject('view')
@observer
export default class Kids extends Component {
  render () {
    const {
      kids,
      day,
      starsToShow
    } = this.props.view

    const kidsComponents = Object.keys(kids).map((kidName) => (
      <Kid
        date={day}
        key={kidName}
        stars={starsToShow[kidName]}
        name={kidName}
      />
    ))
    return (
      <div>
        {kidsComponents}
        <Navigation />
      </div>
    )
  }
}

Kids.propTypes = {
  view: PropTypes.shape({
    day: PropTypes.string.isRequired,
    kids: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired
    })).isRequired,
    starsToShow: PropTypes.number.isRequired
  })
}
