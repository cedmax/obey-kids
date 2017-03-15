import { observable, action, computed } from 'mobx';

class Store {
  @observable user = null;
  @observable day = '';
  @observable next = false;

  @computed get kids() {
    return this.kidsMap.toJS();
  }

  @computed get graphData() {
    return this.kidsGraphMap.toJS();
  }

  constructor() {
    this.kidsMap = observable.map({});
    this.kidsGraphMap = observable.map({});
  }

  @action.bound setUser(user) {
    this.user = user;
  }

  @action.bound setKid(name, stars) {
    name && this.kidsMap.set(name, stars);
  }

  @action.bound enableNext(value) {
    this.next = value;
  }

  @action.bound addToGraph(kidName, stars, day) {
    let toAssign = {
      [day]: stars
    };

    if (this.kidsGraphMap.has(kidName)) {
      toAssign = Object.assign(this.kidsGraphMap.get(kidName), toAssign);
    }
    this.kidsGraphMap.set(kidName, toAssign);
  }

  @action.bound setDay(day) {
    this.day = day;
  }
}

const store = new Store();
export default store;
