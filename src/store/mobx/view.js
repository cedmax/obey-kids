import { observable, action, computed } from 'mobx'
import constants from 'store/constants'
import graph from 'store/mobx/graph'

class ViewStore {
  @observable day = '';
  @observable next = false;
  @observable graphMode = false;
  @observable graphSize = constants.GRAPH_LENGTH.fortnight
  @computed get starsToShow () {
    return (!this.graphMode)
      ? this.kids
      : graph.getTotal(this.graphSize)
  }

  @computed get kids () {
    return this.kidsMap.toJS()
  }

  constructor () {
    this.kidsMap = observable.map({})
  }

  @action.bound setKid (name, stars) {
    name && this.kidsMap.set(name, stars)
  }

  @action.bound enableNext (value) {
    this.next = value
  }

  @action.bound setDay (day) {
    this.day = day
  }

  @action.bound hideGraph () {
    this.graphMode = false
  }

  @action.bound showGraph () {
    this.graphMode = true
  }

  @action.bound resizeGraph (size) {
    this.graphSize = size
  }
}

const viewStore = new ViewStore()
export default viewStore
