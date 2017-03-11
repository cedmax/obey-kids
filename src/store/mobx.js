import { observable, action, computed } from 'mobx';

class Store {
  @observable user = null;
  @observable day = '';
  @observable direction = {
    prev: false,
    next: false
  };

  @computed get kids() {
    return this.kidsMap.toJS();
  }

  constructor() {
    this.kidsMap = observable.map({});
  }
  
  @action.bound setUser(user) {
    this.user = user;
  }

  @action.bound setKid(name, stars) {
    name && this.kidsMap.set(name, stars);
  }

  @action.bound enableNav(direction, value) {
    this.direction[direction] = value;
  }

  @action.bound setDay(day) {
    this.day = day;
  }
}

const store = new Store();
export default store;
