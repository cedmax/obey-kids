import { observable, action, computed } from 'mobx'

class GraphStore {
  @computed get data () {
    return this.kidsGraphMap.toJS()
  }

  constructor () {
    this.kidsGraphMap = observable.map({})
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
}

const graphStore = new GraphStore()
export default graphStore
