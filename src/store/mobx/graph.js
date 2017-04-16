import { observable, action, computed } from 'mobx'

class GraphStore {
  @computed get data () {
    return this.kidsGraphMap.toJS()
  }

  getTotal (length) {
    const totalMap = this.kidsGraphMap.toJS()
    Object.keys(totalMap).forEach(kid => {
      const datePoints = Object.keys(totalMap[kid]).sort().slice(-length)
      totalMap[kid] = datePoints.reduce((acc, val) => acc + totalMap[kid][val], 0)
    })
    return totalMap
  }

  constructor () {
    this.kidsGraphMap = observable.map({})
    this.totalMap = observable.map({})
  }

  @action.bound addToGraph (kidName, stars, day) {
    let toAssign = {
      [day]: stars
    }

    if (this.kidsGraphMap.has(kidName)) {
      toAssign = Object.assign(this.kidsGraphMap.get(kidName), toAssign)
    }

    this.kidsGraphMap.set(kidName, toAssign)
  }

  @action.bound updateGraph (kidName, stars, day) {
    const currentValue = this.kidsGraphMap.get(kidName)[day]

    if (currentValue || currentValue === 0) {
      let toAssign = {
        [day]: stars
      }

      const toAdd = this.totalMap.get(kidName) - currentValue + stars
      this.totalMap.set(kidName, toAdd)

      toAssign = Object.assign(this.kidsGraphMap.get(kidName), toAssign)
      this.kidsGraphMap.set(kidName, toAssign)
    }
  }
}

const graphStore = new GraphStore()
export default graphStore
