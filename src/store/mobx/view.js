import { observable, action, computed } from 'mobx';

class ViewStore {
  @observable day = '';
  @observable next = false;

  @computed get kids() {
    return this.kidsMap.toJS();
  }

  constructor() {
    this.kidsMap = observable.map({});
  }

  @action.bound setKid(name, stars) {
    name && this.kidsMap.set(name, stars);
  }

  @action.bound enableNext(value) {
    this.next = value;
  }

  @action.bound setDay(day) {
    this.day = day;
  }
}

const viewStore = new ViewStore();
export default viewStore;
