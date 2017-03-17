import React, { PropTypes, Component } from 'react'
import Evaluation from 'components/molecules/evaluation'
import stringToDigit from 'helpers/string-to-digit'
import style from 'styles/kid.scss'
import Graph from 'components/molecules/graph'
import { observer, inject } from 'mobx-react'

@inject((stores) => ({
  view: stores.view,
  graph: stores.graph
}))
@observer
export default class Kid extends Component {
  render () {
    const {
      view: {
        graphMode
      },
      graph: {
        total
      },
      name,
      stars,
      date
    } = this.props

    const iconSrc = stringToDigit(name)
    let bodyElm
    if (graphMode) {
      bodyElm = (
        <Graph
          name={name}
        />
      )
    } else {
      bodyElm = (
        <Evaluation
          date={date}
          name={name}
          stars={stars}
        />
      )
    }

    return (
      <div className={style.body}>
        <h1 className={style.title}>
          <img
            className={style.icon}
            src={`/assets/svg/icons/${iconSrc}.svg`}
          />

          { name }<span> ({ graphMode ? total[name] : stars })</span>
        </h1>
        { bodyElm }
      </div>
    )
  }
}

Kid.propTypes = {
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
  view: PropTypes.shape({
    graphMode: PropTypes.bool
  })
}
