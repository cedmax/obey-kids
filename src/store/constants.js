export default {
  URL_FORMAT: 'YYYYMMDD',
  DATE_FORMAT: 'DD/MM/YYYY',
  STARS: 3,
  ACTION_UP: 'up',
  ACTION_DOWN: 'down'
}

export const graph = {
  options: {
    legend: {
      display: false
    },
    layout: {
      padding: 20
    },
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      xAxes: [{
        ticks: {
          padding: 3,
          fontColor: 'rgba(255,232,31, .8)'
        },
        gridLines: {
          display: false,
          color: 'rgba(255,255,255,.4)'
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          display: false,
          max: 3.2,
          stepValue: 1,
          fontColor: 'rgba(255,232,31, .8)'
        },
        gridLines: {
          display: false,
          color: 'rgba(255,255,255,.4)'
        }
      }]
    }
  },
  dataSet: {
    fill: true,
    backgroundColor: 'rgba(255,232,31, .2)',
    borderColor: '#FFE81F',
    pointRadius: 0
  }
}
