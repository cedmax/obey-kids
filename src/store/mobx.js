import { observable, action, extendObservable } from 'mobx';

class Store {
  @observable user = null;
  @observable kids = {};

  @action.bound setUser(user) {
    this.user = user;
  }

  @action.bound setKid(name, stars) {
    name && extendObservable(this.kids, {
      [name]: stars
    });
  }
}

const store = new Store();
export default store;
