import React, { PropTypes, Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Line } from 'react-chartjs-2'
import getDates from 'helpers/get-dates'
import { graph as graphConst } from 'store/constants'

@inject((store) => {
  return {
    view: store.view,
    graph: store.graph
  }
})
@observer
export default class Graph extends Component {
  render () {
    const {
      graph: {
        data
      },
      view: {
        graphSize
      },
      name
    } = this.props

    const dataPoints = Object.keys(data[name]).sort().slice(-graphSize)
    const chartData = {
      labels: dataPoints.map(getDates.pretty),
      datasets: [
        Object.assign({}, graphConst.dataSet, {
          data: dataPoints.map((dataPoint) => data[name][dataPoint])
        })
      ]
    }

    return (
      <Line key={name} data={chartData} options={graphConst.options} />
    )
  }
}

Graph.propTypes = {
  name: PropTypes.string,
  graph: PropTypes.shape({
    data: PropTypes.object
  }),
  view: PropTypes.shape({
    graphSize: PropTypes.number
  })
}
