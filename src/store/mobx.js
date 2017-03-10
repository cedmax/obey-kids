import { observable, action, extendObservable } from 'mobx';

class Store {
  @observable user = null;
  @observable kids = {};
  @observable day = '';

  @action.bound setUser(user) {
    this.user = user;
  }

  @action.bound setKid(name, stars) {
    name && extendObservable(this.kids, {
      [name]: stars
    });
  }

  @action.bound setDay(day) {
    this.day = day;
  }
}

const store = new Store();
export default store;
