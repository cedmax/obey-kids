import { observable, action, computed } from 'mobx'

class GraphStore {
  @computed get data () {
    return this.kidsGraphMap.toJS()
  }

  @computed get total () {
    return this.totalMap.toJS()
  }

  constructor () {
    this.kidsGraphMap = observable.map({})
    this.totalMap = observable.map({})
  }

  @action.bound addToGraph (kidName, stars, day) {
    let toAdd = stars
    let toAssign = {
      [day]: stars
    }

    if (this.kidsGraphMap.has(kidName)) {
      toAdd = this.totalMap.get(kidName) + stars
      toAssign = Object.assign(this.kidsGraphMap.get(kidName), toAssign)
    }
    this.totalMap.set(kidName, toAdd)
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
