import { observable, action, extendObservable } from 'mobx';

class Store {
  @observable user = null;
  @observable kids = {};
  @observable day = '';
  @observable direction = {
    prev: false,
    next: false
  };

  @action.bound setUser(user) {
    this.user = user;
  }

  @action.bound setKid(name, stars) {
    name && extendObservable(this.kids, {
      [name]: stars
    });
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
